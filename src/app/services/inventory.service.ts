import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
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
export class InventoryService {
  tempUserBag = [];
  constructor(private http: HttpClient) { }

  fetchInventoryItems(): Observable<any> {
    return this.http.get<any>
      ('https://aidrone-1250389064.ap-south-1.elb.amazonaws.com/fetchinventory', httpOptions);
  }
}
