import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json',
    })
};
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  onSignup(Name: string, Email: string, Password: string): Observable<any> {
    return this.http.post<any[]>
      ('http://127.0.0.1:5000/add',
        {
          name: Name,
          email: Email,
          pwd: Password
        }, httpOptions);
  }
  onLogin(Email: string, Password: string): Observable<any> {
    return this.http.post<any[]>
      ('http://127.0.0.1:5000/authentication',
      {
        email: Email,
        pwd: Password
      },
      httpOptions);
  }
}
