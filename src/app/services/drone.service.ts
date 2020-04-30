import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GPS } from '../models/GPS';
import { AppService } from '../app.service';
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
  constructor(private http: HttpClient,
              private appService: AppService) {
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
    console.log('#3');
    console.log(this.gps);
   }

  deliverPacket(gps: any, missionId: string) {
    console.log('local storage : ' + localStorage.getItem('missionId'));
    return this.http.post<any>
      ('https://aidrone-1250389064.ap-south-1.elb.amazonaws.com/coordinates', {
        src : {
          lat: gps.src.lat,
          lon: gps.src.lng
        },
        des: {
          lat: gps.des.lat,
          lon: gps.des.lng
        },
        user_id: '5e88w13w0c752aaf9e6c991e', mission_id: localStorage.getItem('missionId')
      }, httpOptions);
  }
  emitBeacon(UUID: string): Observable<any> {
    return this.http.post<any>
      ('http://127.0.0.1:5000/beacon', {
        uuid : UUID
      }, httpOptions);
  }
  getDrones() {
    return this.http.get<any>
      ('http://35.154.138:70/getdrones', httpOptions);
  }
  readCoordinatesByMissionId(missionId: string) {
    return this.http.post<any>
    ('https://aidrone-1250389064.ap-south-1.elb.amazonaws.com/readCoordinatesByMissionId',
    {
      mission_id: localStorage.getItem('missionId')
    },
    httpOptions);
  }
}
