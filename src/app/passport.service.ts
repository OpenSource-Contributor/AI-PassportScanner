import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PassportService {

  constructor(private http: HttpClient) { }
  getPassportInfo(passportImage) {
    const body = {
      language: 'eng',
      image: passportImage
    };
    return this.http.post('http://10.15.90.196:8081/api/ocr', body);
  }
}
