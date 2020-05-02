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
    return this.http.post<any>
      ('https://aidrone-1250389064.ap-south-1.elb.amazonaws.com/signup',
        {
          name: Name,
          email: Email,
          password: Password
        }, httpOptions);
  }
  onLogin(Email: string, Password: string): Observable<any> {
    return this.http.post<any>
      ('https://aidrone-1250389064.ap-south-1.elb.amazonaws.com/userValidation',
      {
        email: Email,
        password: Password
      },
      httpOptions);
  }
}
