import { Component, OnInit, ViewChild, ElementRef, NgZone, AfterContentInit, DoCheck } from '@angular/core';
import {} from 'googlemaps';
import { DroneService } from '../services/drone.service';
import { GPS } from '../models/GPS';
import * as Pusher from 'pusher-js';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit, AfterContentInit, DoCheck {
  image = {
    url: '../assets/icon/drone.png',
    // This marker is 20 pixels wide by 32 pixels high.
    // size: new google.maps.Size(20, 32),
    // The origin for this image is (0, 0).
    origin: new google.maps.Point(0, 0),
    // The anchor for this image is the base of the flagpole at (0, 32).
    anchor: new google.maps.Point(0, 32)
  };
  map;
  @ViewChild('mapElement', {static: true}) mapElement;

  current = {lat: 0.0, lng: 0.0};
  marker: any;
  flightPlanCoordinates = [];
  flightPath: any;
  gps: GPS;
  pushNotificationFlag = false;
  constructor(private droneService: DroneService,
              private localNotifications: LocalNotifications) {
    this.gps = droneService.gps;
    Pusher.logToConsole = true;

    const pusher = new Pusher('980f167a4cd9ef7b753c', {
         cluster: 'ap2',
         forceTLS: true
       });

    const channel = pusher.subscribe('my-channel');
    channel.bind('my-event', (obj) => {
        this.current.lat = obj.latitude;
        this.current.lng = obj.longitude;
        this.marker = new google.maps.Marker({
        position: {
          lat: obj.latitude,
          lng: obj.longitude
        },
        map: this.map,
        icon: this.image        });
       });
  }

  ngOnInit(): void {
    console.log(JSON.stringify(this.droneService.gps));
    this.flightPlanCoordinates = [
      {lat: this.gps.src.lat, lng: this.gps.src.lon},
      {lat: this.gps.des.lat, lng: this.gps.des.lon},
    ];
    this.current = { lat: this.gps.src.lat, lng: this.gps.src.lon};
    setTimeout(() => {
      console.log('Pushed notification');
      this.localNotifications.schedule({
        id: 1,
        text: 'Drone Delivery Update',
        sound: '../assets/music/push-notification.mp3',
        data: 'Testing notifications!'
      });
    }, 10000);
  }

  ngAfterContentInit(): void {
    this.map = new google.maps.Map(
        this.mapElement.nativeElement,
        {
          center: {lat: this.gps.src.lat, lng: this.gps.src.lon},
          zoom: 20
        });
    this.flightPath = new google.maps.Polyline({
      path: this.flightPlanCoordinates,
      geodesic: true,
      strokeColor: '#00ff2a',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });
    this.marker = new google.maps.Marker({position: {
      lat: this.gps.src.lat,
      lng: this.gps.src.lon
    }, map: this.map, icon: '../assets/icon/amazon.png',
    animation: google.maps.Animation.BOUNCE});
    this.marker = new google.maps.Marker({position: {
      lat: this.gps.des.lat,
      lng: this.gps.des.lon
    }, map: this.map, icon: '../assets/icon/user.png',
    animation: google.maps.Animation.BOUNCE});
    this.flightPath.setMap(this.map);
  }
  ngDoCheck() {
    if (this.pushNotificationFlag) {
      this.localNotifications.schedule({
        id: 1,
        text: 'Drone Delivery Update',
        sound: '../assets/music/push-notification.mp3',
        data: 'Your parcel will reach in -- seconds!'
      });
    }
  }
}
