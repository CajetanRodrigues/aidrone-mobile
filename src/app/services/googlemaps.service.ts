import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
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
export class GooglemapsService {
  // public gpsSubject = new Subject<GPS>();
  constructor(private http: HttpClient) { }
  getGeocoderResults(place: string): Observable<any> {
    place = place.replace(/,/g, '').replace(/ /g, '+');
    return this.http.get<any>
      ('https://maps.googleapis.com/maps/api/geocode/json?address=' + place +
      '&key=AIzaSyDAyTW-4duB-d0o4-KjnsTggnG_ihl0N5M');
  }
  // emitGPSObservable(gps: GPS) {
  //   console.log('in ssevice :' + JSON.stringify(gps));
  //   this.gpsSubject.next(gps);
  // }
}
