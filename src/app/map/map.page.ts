import { Component, OnInit, ViewChild, ElementRef, NgZone, AfterContentInit, DoCheck } from '@angular/core';
import {} from 'googlemaps';
import { DroneService } from '../services/drone.service';
import { GPS } from '../models/GPS';
import * as Pusher from 'pusher-js';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { IBeacon } from '@ionic-native/ibeacon/ngx';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { AppService } from '../app.service';
import { MissionService } from '../services/mission.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
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
  flightPlanCoordinates = [
    {lat: 19.044503, lng: 72.820451},
    {lat: 19.0446372, lng: 72.8204825},
    {lat: 19.0448958, lng: 72.8191573},
    {lat: 19.0500347, lng: 72.8212408},
  ];
  flightPath: any;
  gps: GPS;
  pushNotificationFlag = false;
  vicinity = false;
  missionId = '';
  constructor(
              private missionService: MissionService,
              private route: ActivatedRoute,
              private droneService: DroneService) {
    this.missionId = this.route.snapshot.paramMap.get('id');

    // Dont know why the below statement
      //  
  }

  ngOnInit(): void {

    // Fetch one mission by id and set the path
    this.missionService.fetchMissionByID(this.missionId)
      .subscribe((mission: any) => {
        console.log('My fetched waypoints');
        console.log(mission.waypoints);
        this.flightPlanCoordinates = mission.waypoints;

        setTimeout(() => {
            // Drawing the path on the google map
        this.flightPath = new google.maps.Polyline({
          path: this.flightPlanCoordinates,
          geodesic: true,
          strokeColor: '#00ff2a',
          strokeOpacity: 1.0,
          strokeWeight: 2
        });
        this.map = new google.maps.Map(
            this.mapElement.nativeElement,
            {
              center: {lat: this.flightPlanCoordinates[0].lat, lng: this.flightPlanCoordinates[0].lng},
              zoom: 17
            });


          // Setting Source location
        this.marker = new google.maps.Marker({position: {
            lat: this.flightPlanCoordinates[0].lat,
            lng: this.flightPlanCoordinates[0].lng
        }, map: this.map, icon: '../assets/icon/drone.png',
        animation: google.maps.Animation.BOUNCE});


          // Setting destination location
        this.marker = new google.maps.Marker({position: {
            lat: this.flightPlanCoordinates[this.flightPlanCoordinates.length - 1].lat,
            lng: this.flightPlanCoordinates[this.flightPlanCoordinates.length - 1].lng
        }, map: this.map, icon: '../assets/icon/user.png',
        animation: google.maps.Animation.BOUNCE});
        setTimeout(() => {
            this.flightPath.setMap(this.map);
      }, 200);
    }, 200);
      });
    // current variable ?
    this.current = { lat: this.flightPlanCoordinates[0].lat, lng: this.flightPlanCoordinates[0].lng};

    // Now call the user orders by missionID every 2 seconds
    setInterval(() => {
      this.droneService.readCoordinatesByMissionId(this.missionId)
      .subscribe((data) => {
        console.log('syncing...next sync after 3s');
        console.log(data);
        this.current.lat = Number(data[0].latitude);
        this.current.lng = Number(data[0].longitude);
      // This is the live marker which is updated every 5 seconds
        this.marker = new google.maps.Marker({
        position: {
          lat: Number(data[0].latitude),
          lng: Number(data[0].longitude),
        },
        map: this.map,
        icon: this.image,
        // animation: google.maps.Animation.BOUNCE
        });
        setTimeout(() => {
          this.marker.setMap(null);
          // this.marker.setAnimation(null);
        }, 900);
      });
    }, 1000);
 }


}
