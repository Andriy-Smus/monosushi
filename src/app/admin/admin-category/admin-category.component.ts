import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICategoryResponse } from 'src/app/shared/interfaces/category/category.interface';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ImageService } from 'src/app/shared/services/image/image.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit {

  public adminCategories: Array<ICategoryResponse> = [];
  public categoryForm!: FormGroup;
  public editStatus = false;
  public addStatus = false;
  public uploadPercent!: number;
  public isUploaded = false;
  private currentCategoryId!: number | string;

  public isRedName = false;
  public isRedPath = false;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private imageService: ImageService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.initCategoryForm();
    this.loadCategories();
  }

  initCategoryForm(): void {
    this.categoryForm = this.fb.group({
      name: [null, Validators.required],
      path: [null, Validators.required],
      imagePath: ['https://la.ua/wp-content/uploads/2021/06/menu-icon-2.svg', Validators.required]
    });
  }

  loadCategories(): void {
    this.categoryService.getAllFirebase().subscribe(data => {
      this.adminCategories = data as ICategoryResponse[];
    })
  }

  blurName(): void {
    if(!this.categoryForm.value.name) {
      this.isRedName = true
    } else {
      this.isRedName = false
    }
  }
  blurPath(): void {
    if(!this.categoryForm.value.path) {
      this.isRedPath = true
    } else {
      this.isRedPath = false
    }
  }

  openAddCategory(): void {
    this.addStatus = !this.addStatus;
  }

  addCategory(): void {
    if(this.editStatus){
      this.categoryService.updateFirebase(this.categoryForm.value, this.currentCategoryId as string).then(() => {
        this.loadCategories();
        this.toastr.success('Категорія успішно змінена!');
      })
    } else {
      this.categoryService.createFirebase(this.categoryForm.value).then(() => {
        this.toastr.success('Категорія успішно створена!');
      })
    }
    this.editStatus = false;
    this.categoryForm.reset();
    this.isUploaded = false;
    this.uploadPercent = 0;
    this.addStatus = false;
  }

  editCategory(category: ICategoryResponse): void {
    this.categoryForm.patchValue({
      name: category.name,
      path: category.path,
      imagePath: category.imagePath
    });
    this.editStatus = true;
    this.currentCategoryId = category.id as number;
    this.isUploaded = true;
    this.addStatus = true;
  }

  deleteCategory(category: ICategoryResponse): void {
    this.categoryService.deleteFirebase(category.id as string).then(() => {
      this.loadCategories();
      this.toastr.success('Категорія успішно видалена!');
    })
  }

  upload(event: any): void {
    const file = event.target.files[0];
    this.imageService.uploadFile('images', file.name, file)
      .then(data => {
        this.categoryForm.patchValue({
          imagePath: data
        });
        this.isUploaded = true;
      })
      .catch(err => {
        console.log(err);
      })
  }

  deleteImage(): void {
    this.imageService.deleteUploadFile(this.valueByControl('imagePath'))
      .then(() => {
        this.isUploaded = false;
        this.uploadPercent = 0;
        this.categoryForm.patchValue({ imagePath: null });
      })
      .catch(err => {
        console.log(err);
      })
  }

  valueByControl(control: string): string {
    return this.categoryForm.get(control)?.value;
  }

}
