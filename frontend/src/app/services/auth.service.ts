import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // private url = 'http://localhost:1337/api/agents';

  private baseUrl = `${environment.devUrl}/users/`;
  private authURL = `${environment.devUrl}/auth`;

  constructor(private http: HttpClient) {
    
  }

  //  check if the user is logged in [a logged in user has a token] 
  isLoggedIn() {
    return !!localStorage.getItem('jwtToken');
  }

  // register a user
  register(formData: any): Observable<any> {
    return this.http.post(`${this.authURL}/register`, formData);
  }

  // login a user
  login(formData: any) : Observable<any>{
    return this.http.post(`${this.authURL}/login`, formData);
  }

  // get user info
  getUserData(id: number) {
    return this.http.get(`${this.baseUrl}${id}`);
  }

}
