import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDiscountResponse } from 'src/app/shared/interfaces/discount/discount.interface';
import { DiscountService } from 'src/app/shared/services/discount/discount.service';
import { ImageService } from 'src/app/shared/services/image/image.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-discount',
  templateUrl: './admin-discount.component.html',
  styleUrls: ['./admin-discount.component.scss']
})
export class AdminDiscountComponent implements OnInit {

  public adminDiscounts!: IDiscountResponse[];
  public editStatus = false;
  public addStatus = false;
  private editID!: number | string;
  public isRedName = false;
  public isRedTitle = false;
  public isRedDescription = false;

  public discountForm!: FormGroup;
  public uploadPercent!: number;
  public isUploaded = false;

  constructor(
    private fb: FormBuilder,
    private discountService: DiscountService,
    private imageService: ImageService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.initDiscountForm();
    this.getDiscounts();
  }
  initDiscountForm(): void {
    this.discountForm = this.fb.group({
      data: new Date,
      name: [null, Validators.required],
      title: [null, Validators.required],
      description: [null, Validators.required],
      imagePath: [null, Validators.required]
    })
  }

  blurName(): void {
    if(!this.discountForm.value.name) {
      this.isRedName = true
    } else {
      this.isRedName = false
    }
  }
  blurTitle(): void {
    if(!this.discountForm.value.title) {
      this.isRedTitle = true
    } else {
      this.isRedTitle = false
    }
  }
  blurDescription(): void {
    if(!this.discountForm.value.description) {
      this.isRedDescription = true
    } else {
      this.isRedDescription = false
    }
  }

  getDiscounts(): void {
    this.discountService.getAllFirebase().subscribe(data => {
      this.adminDiscounts = data as IDiscountResponse[];
      this.adminDiscounts.forEach(discount => {
        discount.data = discount.data.toDate();
      });
    })
  }

  openAddDiscount(): void {
    this.addStatus = !this.addStatus;
  }

  addDiscount(): void {
    if(this.editStatus) {
      this.discountService.updateFirebase(this.discountForm.value, this.editID as string).then(() => {
        this.getDiscounts();
        this.toastr.success('Акція успішно змінена!');
      })
    } else {
      this.discountService.createFirebase(this.discountForm.value).then(() => {
        this.getDiscounts();
        this.toastr.success('Акція успішно створена!');
      })
    }
    this.editStatus = false;
    this.discountForm.reset();
    this.discountForm.value.data = new Date();
    this.isUploaded = false;
    this.uploadPercent = 0;
    this.addStatus = false;
  }

  editDiscount(discount: IDiscountResponse): void {
    this.discountForm.patchValue({
      name: discount.name,
      title: discount.title,
      description: discount.description,
      imagePath: discount.imagePath,
    })
    this.editStatus = true;
    this.editID = discount.id;
    this.isUploaded = true;
    this.addStatus = true;
    this.addStatus = true;
  }

  deleteDiscount(discount: IDiscountResponse): void {
    this.discountService.deleteFirebase(discount.id as string).then(() => {
      this.getDiscounts();
      this.toastr.success('Акція успішно видалена!');
    })
  }

  upload(event: any): void {
    const file = event.target.files[0];
    this.imageService.uploadFile('images', file.name, file)
      .then(data => {
        this.discountForm.patchValue({
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
        this.discountForm.patchValue({ imagePath: null });
      })
      .catch(err => {
        console.log(err);
      })
  }

  valueByControl(control: string): string {
    return this.discountForm.get(control)?.value;
  }
}
