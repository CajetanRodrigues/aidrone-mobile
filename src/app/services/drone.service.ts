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

  public gps: GPS;
  constructor(private http: HttpClient) { }

  deliverPacket(gps: any): Observable<any> {
    return this.http.post<any>
      ('', {
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
}
