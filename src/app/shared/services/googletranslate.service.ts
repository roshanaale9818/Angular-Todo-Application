import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { envrionment } from 'src/environments/environment';
import { GoogleObj } from '../modal/GoogleObj.interface';
import { Language } from '../modal/Language.interface';

@Injectable({
  providedIn: 'root'
})
export class GoogletranslateService {
  url = 'https://translation.googleapis.com/language/translate/v2?key=';
  constructor(private http:HttpClient) { }
  key:string=envrionment.googleKey;
  translate(obj: GoogleObj) {
    return this.http.post(this.url + this.key, obj);
    }

    public languages:Language[]=[
      {
        name:"Spanish",
        code:'es'
      },
      {
        name:"Punjabi",
        code:'pa'
      },
      {
        name:"Nepali",
        code:'ne'
      },
      {
        name:"Hindi",
        code:'hi'
      },
      {
        name:"Default",
        code:'default'
      }
    ];

}
