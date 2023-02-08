import { Injectable } from '@angular/core';
import { envrionment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { UserDTO } from 'src/app/shared/modal/custom.response.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
apiUrl = envrionment.apiUrl;
  constructor(
    private http:HttpClient,
  ) { }
  getUsers():Observable<any>{
    return this.http.get(`${this.apiUrl}/users`);
  }
  getTranslationHistory(id:string){
    return this.http.post(`${this.apiUrl}/gettranslation`,{userId:String(id)});
  }
}
