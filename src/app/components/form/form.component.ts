import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { docxFileExtensionValidator } from 'src/app/core/validators/extensionValidators';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  myForm: FormGroup;
  file: any;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.myForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      file: ['', [Validators.required, docxFileExtensionValidator()]]
    });
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('email', this.myForm.controls['email'].value);
    formData.append('file', this.file);
    this.http.post('http://server-url', formData).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      this.file = file;
    }
  }

}
