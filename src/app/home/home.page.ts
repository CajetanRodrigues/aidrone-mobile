import { Component } from '@angular/core';
import * as Pusher from 'pusher-js';
export interface Param {
  latitude: number;
  longitude: number;
  altitude: number;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  latitude = 0;
  longitude = 0;
  altitude = 0;
  velocity = 0;
  params: Param[] = [];
  constructor() {
       // Enable pusher logging - don't include this in production
       Pusher.logToConsole = true;

       const pusher = new Pusher('980f167a4cd9ef7b753c', {
         cluster: 'ap2',
         forceTLS: true
       });

       const channel = pusher.subscribe('my-channel');
       channel.bind('my-event', (obj) => {
        this.latitude = obj.latitude;
        this.longitude = obj.longitude;
        this.altitude = obj.altitude;
        this.velocity = obj.velocity;
       });
  }
  

}
