import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDiscountResponse } from 'src/app/shared/interfaces/discount/discount.interface';
import { DiscountService } from 'src/app/shared/services/discount/discount.service';
import { Storage, getDownloadURL, percentage, uploadBytesResumable, ref, deleteObject } from '@angular/fire/storage';
// import { ref } from 'firebase/storage';

@Component({
  selector: 'app-admin-discount',
  templateUrl: './admin-discount.component.html',
  styleUrls: ['./admin-discount.component.scss']
})
export class AdminDiscountComponent implements OnInit {

  public adminDiscounts!: IDiscountResponse[];
  public imagePath = 'https://la.ua/wp-content/uploads/2021/08/6-1.jpg';
  public editStatus = false;
  public addStatus = false;
  public editID!: number;
  public isRedName = false;
  public isRedTitle = false;
  public isRedDescription = false;

  public discountForm!: FormGroup;
  public uploadPercent!: number;
  public isUploaded = false;

  constructor(
    private fb: FormBuilder,
    private discountService: DiscountService,
    private storage: Storage
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
    this.discountService.getAll().subscribe(data => {
      this.adminDiscounts = data;
    })
  }

  openAddDiscount(): void {
    this.addStatus = !this.addStatus;
  }

  addDiscount(): void {
    if(this.editStatus) {
      this.discountService.update(this.discountForm.value, this.editID).subscribe(() => {
        this.getDiscounts();
      })
    } else {
      this.discountService.create(this.discountForm.value).subscribe(() => {
        this.getDiscounts();
      })
    }
    this.editStatus = false;
    this.discountForm.reset();
    this.isUploaded = false;
    this.uploadPercent = 0;
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
  }

  deleteDiscount(discount: IDiscountResponse): void {
    this.discountService.delete(discount.id).subscribe(() => {
      this.getDiscounts();
    })
  }

  upload(event: any): void {
    const file = event.target.files[0];
    this.uploadFile('images', file.name, file)
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

  async uploadFile(folder: string, name: string, file: File | null): Promise<string> {
    const path = `${folder}/${name}`;
    let url = '';
    if(file) {
      try {
        const storageRef = ref(this.storage, path);
        const task = uploadBytesResumable(storageRef, file);
        percentage(task).subscribe(data => {
          this.uploadPercent = data.progress
        });
        await task;
        url = await getDownloadURL(storageRef);
      } catch (e: any) {
        console.error(e);
      }
    } else {
      console.log('wrong format')
    }
    return Promise.resolve(url)
  }

  deleteImage(): void {
    const task = ref(this.storage, this.valueByControl('imagePath'));
    deleteObject(task).then(() => {
      console.log('file deleted');
      this.isUploaded = false;
      this.uploadPercent = 0;
      this.discountForm.patchValue({
        imagePath: null
      })
    })
  }

  valueByControl(control: string): string {
    return this.discountForm.get(control)?.value;
  }
}
