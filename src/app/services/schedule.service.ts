import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inventory } from '../models/Inventory';
const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json',
    })
};
@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private http: HttpClient) { }
  assignDronesToInventoryItems(inventoryList: Inventory[]): Observable<any> {
    console.log({ product: inventoryList });
    return this.http.post<any>
      ('http://35.154.138.70/assigndrone', { product: inventoryList }, httpOptions);
  }
}
