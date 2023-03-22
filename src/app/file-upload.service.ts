import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  constructor(private http: HttpClient) { }

  async uploadFile(formData: FormData) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data')
    const response = await this.http.post('https://reenbitcamptesttaskbackend20230322003920.azurewebsites.net/Main', formData, { headers: headers, responseType: 'text', observe: "response" }).toPromise();
    return response;
  }
}
