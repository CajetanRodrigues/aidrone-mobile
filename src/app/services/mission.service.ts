import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppService } from '../app.service';
import { DroneService } from './drone.service';
const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json',
    })
};
@Injectable({
  providedIn: 'root'
})
export class MissionService {

  constructor(private http: HttpClient,
              private appService: AppService,
              private droneService: DroneService) { }
  fetchOrders(): Observable<any> {
    return this.http.get<any>
      ('http://127.0.0.1:5000/fetchorders',
       httpOptions);
  }
  fetchMissions(): Observable<any> {
    return this.http.get<any>
      ('https://aidrone-1250389064.ap-south-1.elb.amazonaws.com/readmissions',
       httpOptions);
  }
  fetchMissionByID(id: any): Observable<any> {
    return this.http.post<any>
      ('https://aidrone-1250389064.ap-south-1.elb.amazonaws.com/readMissionById',
      {
        _id : id
      },
      httpOptions);
  }
  fetchInventoryItems(): Observable<any> {
    return this.http.get<any>
      ('http://35.154.138.70/fetchinventory', httpOptions);
  }
  createOrder(order: any): Observable<any> {
    console.log('this is my requets here');
    console.log({ AssignedDrones: order });
    return this.http.post<any>
      ('http://35.154.138.70/addorder', { AssignedDrones: order }, httpOptions);
  }
  createMission(orderid: any): Observable<any> {

    return this.http.post<any>
      ('https://aidrone-1250389064.ap-south-1.elb.amazonaws.com/createmission',
      {
        order_id: orderid,
        from: this.appService.from,
        to: this.appService.to,
        src_lat: this.droneService.gps.src.lat,
        src_lon: this.droneService.gps.src.lng,
        dest_lat: this.droneService.gps.des.lat,
        dest_lon: this.droneService.gps.des.lng
      }
      , httpOptions);
  }
}
