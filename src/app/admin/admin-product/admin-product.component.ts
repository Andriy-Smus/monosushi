import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICategoryResponse } from 'src/app/shared/interfaces/category/category.interface';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { ImageService } from 'src/app/shared/services/image/image.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent implements OnInit {

  public adminCategories: Array<ICategoryResponse> = [];
  public adminProducts: Array<IProductResponse> = [];
  public editStatus = false;
  public addStatus = false;
  private editID!: number;
  public isRedCategory = false;
  public isRedName = false;
  public isRedPath = false;
  public isRedIngredients = false;
  public isRedWeight = false;
  public isRedPrice = false;

  public productForm!: FormGroup;
  public uploadPercent!: number;
  public isUploaded = false;

  // private currentCategoryId = 0;
  // private currentProductId = 0;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private productService: ProductService,
    private imageService: ImageService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.initProductForm();
    this.loadCategories();
    this.loadProduct();
  }
  initProductForm(): void {
    this.productForm = this.fb.group({
      category: [null, Validators.required],
      name: [null, Validators.required],
      path: [null, Validators.required],
      ingredients: [null, Validators.required],
      weight: [null, Validators.required],
      price: [null, Validators.required],
      imagePath: [null, Validators.required],
      count: [1]
    })
  }

  blurCategory(): void {
    if(!this.productForm.value.category) {
      this.isRedCategory = true
    } else {
      this.isRedCategory = false
    }
  }
  blurName(): void {
    if(!this.productForm.value.name) {
      this.isRedName = true
    } else {
      this.isRedName = false
    }
  }
  blurPath(): void {
    if(!this.productForm.value.path) {
      this.isRedPath = true
    } else {
      this.isRedPath = false
    }
  }
  blurIngredients(): void {
    if(!this.productForm.value.ingredients) {
      this.isRedIngredients = true
    } else {
      this.isRedIngredients = false
    }
  }
  blurWeight(): void {
    if(!this.productForm.value.weight) {
      this.isRedWeight = true
    } else {
      this.isRedWeight = false
    }
  }
  blurPrice(): void {
    if(!this.productForm.value.price) {
      this.isRedPrice = true
    } else {
      this.isRedPrice = false
    }
  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe(data => {
      this.adminCategories = data;
      this.productForm.patchValue({
        category: this.adminCategories[0].id
      })
    })
  }

  loadProduct(): void {
    this.productService.getAll().subscribe(data => {
      this.adminProducts = data;
    })
  }

  openAddProduct(): void {
    this.addStatus = !this.addStatus;
  }

  addProduct(): void {
    if(this.editStatus) {
      this.productService.update(this.productForm.value, this.editID).subscribe(() => {
        this.loadProduct();
        this.toastr.success('Продукт успішно змінено!');
      })
    } else {
      this.productService.create(this.productForm.value).subscribe(() => {
        this.loadProduct();
        this.toastr.success('Продукт успішно створено!');
      })
    }
    this.editStatus = false;
    this.productForm.reset();
    this.isUploaded = false;
    // this.uploadPercent = 0;
    this.addStatus = false;
  }

  editProduct(product: IProductResponse): void {
    this.productForm.patchValue({
      category: product.category,
      name: product.name,
      path: product.path,
      ingredients: product.ingredients,
      weight: product.weight,
      price: product.price,
      imagePath: product.imagePath,
    })
    this.editStatus = true;
    this.editID = product.id;
    this.isUploaded = true;
    this.addStatus = true;
  }

  deleteProduct(product: IProductResponse): void {
    this.productService.delete(product.id).subscribe(() => {
      this.loadProduct();
      this.toastr.success('Продукт успішно видалено!');
    })
  }

  upload(event: any): void {
    const file = event.target.files[0];
    this.imageService.uploadFile('images', file.name, file)
      .then(data => {
        this.productForm.patchValue({
          imagePath: data
        });
        this.isUploaded = true
      })
      .catch(err => {
        console.log(err)
      })
  }

  deleteImage(): void {
    this.imageService.deleteUploadFile(this.valueByControl('imagePath'))
      .then(() => {
        this.isUploaded = false;
        this.uploadPercent = 0;
        this.productForm.patchValue({ imagePath: null });
      })
      .catch(err => {
        console.log(err);
      })
  }

  valueByControl(control: string): string {
    return this.productForm.get(control)?.value;
  }
}
