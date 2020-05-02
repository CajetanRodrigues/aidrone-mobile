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
      ('https://aidrone-1250389064.ap-south-1.elb.amazonaws.com/assigndrone', { product: inventoryList }, httpOptions);
  }
}
