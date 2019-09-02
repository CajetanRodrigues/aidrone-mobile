import { Component, OnInit } from '@angular/core';
import * as Pusher from 'pusher-js';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  private selectedItem: any;
  private icons = [
    'flask',
    'wifi',
    'beer',
    'football',
    'basketball',
    'paper-plane',
    'american-football',
    'boat',
    'bluetooth',
    'build'
  ];
  params = [];
  latitude: number;
  longitude: number;
  altitude: number;
  velocity: number;
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
            this.params.push({
              latitude: obj.latitude,
              longitude: obj.longitude,
              altitude: obj.altitude,
              velocity: obj.velocity
            });
            console.log('Fetched ' + this.latitude + ' ' + this.longitude + ' ' + this.altitude);
           });
  }

  ngOnInit() {
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
