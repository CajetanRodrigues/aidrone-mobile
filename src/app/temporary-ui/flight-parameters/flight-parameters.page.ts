import { Component, OnInit } from '@angular/core';
import * as Pusher from 'pusher-js';

@Component({
  selector: 'app-flight-parameters',
  templateUrl: './flight-parameters.page.html',
  styleUrls: ['./flight-parameters.page.scss'],
})
export class FlightParametersPage implements OnInit {
  latitude = 0;
  longitude = 0;
  altitude = 0;
  velocity = 0;
  clientdist: any;
  warehousedist: any;
  vicinity: any;
  clienttime: any;
  warehousetime: any;
  constructor() { }

  ngOnInit() {
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
     this.vicinity = obj.vicinity;
     this.clientdist = obj.clientdist;
     this.warehousedist = obj.warehousedist;
     this.clienttime = obj.clienttime;
     this.warehousetime = obj.warehousetime;
     console.log(this.latitude + '   ' + this.longitude );
    });
  }

}
