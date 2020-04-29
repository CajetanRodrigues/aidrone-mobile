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
      ('http://35.154.138.70/fetchinventory', httpOptions);
  }
}
