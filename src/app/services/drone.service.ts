import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GPS } from '../models/GPS';
const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json',
    })
};
@Injectable({
  providedIn: 'root'
})
export class DroneService {
  public droneModalOpened = false;
  public gps: GPS;
  constructor(private http: HttpClient) {
    this.gps = {
      src : {
        lat : 19.044497,
        lng : 72.8204535
      },
      des : {
        lat : 19.046998,
        lng : 72.81965559999999
      }
    };
   }

  deliverPacket(gps: any): Observable<any> {
    return this.http.post<any>
      ('http://35.154.138:70/coordinates', {
        src : {
          lat: gps.src.lat,
          lon: gps.src.lon
        },
        des: {
          lat: gps.des.lat,
          lon: gps.des.lon
        }
      }, httpOptions);
  }
  emitBeacon(UUID: string): Observable<any> {
    return this.http.post<any>
      ('http://127.0.0.1:5000/beacon', {
        uuid : UUID
      }, httpOptions);
  }
}
