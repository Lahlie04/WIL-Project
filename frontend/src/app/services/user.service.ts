import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userURL = `${environment.devUrl}/student`;

  constructor(private http: HttpClient) { }

  getAllLecture(): Observable<any>{
    return this.http.get(`${this.userURL}/getLectures`)
  }

  uploadAdmission(admission: any): Observable<any>{
    return this.http.post(`${this.userURL}/admission`,admission);
  }

  getAllStudent(): Observable<any>{
    return this.http.get(`${this.userURL}/getStudents`);
  }
}
