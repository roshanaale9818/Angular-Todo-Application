import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GoogleObj } from '../modal/GoogleObj.interface';

@Injectable({
  providedIn: 'root'
})
export class GoogletranslateService {
  url = 'https://translation.googleapis.com/language/translate/v2?key=';
  constructor(private http:HttpClient) { }
  key:string ='AIzaSyBpspuwMpJpAIrvVcD-UMh389JHELgqjBI'
  translate(obj: GoogleObj) {
    return this.http.post(this.url + this.key, obj);
    }

}
