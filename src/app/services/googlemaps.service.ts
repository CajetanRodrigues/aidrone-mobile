import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
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

  constructor(private http: HttpClient) { }
  getGeocoderResults(): Observable<any> {
    return this.http.get<any>
      ('https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway' +
      '&key=AIzaSyCWa1dUXh6EPJGRFxm4VPKKH6L4ZDF1F1o');
  }
}
