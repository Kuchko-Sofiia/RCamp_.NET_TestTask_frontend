import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { docxFileExtensionValidator } from 'src/app/core/validators/extensionValidators';
import { FileUploadService } from './../../file-upload.service';
import { tap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  myForm: FormGroup;
  isLoading: boolean = false;
  isUploaded: boolean = false;
  emailControl: any;
  fileControl: any;
  fileToUpload: any;
  errors: string[] = [];

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private fileUploadService: FileUploadService) {
    this.myForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      file: ['', [Validators.required, docxFileExtensionValidator()]]
    });
    this.emailControl = this.myForm.controls['email'];
    this.fileControl = this.myForm.controls['file'];
  }

  async onSubmit() {
    this.isLoading = true;
    const formData = new FormData();
    formData.append('File', this.fileToUpload);
    formData.append('Email', this.myForm.controls['email'].value);

    try {
      const response = await this.fileUploadService.uploadFile(formData);
      if (response?.status == 200) {
        this.myForm.reset();
        this.errors.length = 0;
      }
    } catch (error) {
      this.handleErrors(error);
    }

    setTimeout(() => {
      this.isLoading = false;
    }, 500);

    this.isUploaded = true;
  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      this.fileToUpload = file;
    }
  }
  goBack(): void {
    this.isUploaded = false;
  }

  handleErrors(error: any) {
    if (error.status === 400) {
      const errorsArray = Array.isArray(error.error) ? error.error : [error.error];
      if (this.errors) {
        this.errors.length = 0;
      }
      this.errors.push(...errorsArray);
    }
  }
}