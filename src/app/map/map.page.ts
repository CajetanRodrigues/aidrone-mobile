import { Component, OnInit, ViewChild, ElementRef, NgZone, AfterContentInit, DoCheck } from '@angular/core';
import {} from 'googlemaps';
import { DroneService } from '../services/drone.service';
import { GPS } from '../models/GPS';
import * as Pusher from 'pusher-js';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { IBeacon } from '@ionic-native/ibeacon/ngx';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit, DoCheck {
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
    {
      lat : 19.044497,
      lng : 72.8204535
    },
   {
      lat : 19.046998,
      lng : 72.81965559999999
    }
  ];
  flightPath: any;
  gps: GPS;
  pushNotificationFlag = false;
  vicinity = false;
  uuid = '';
  constructor(private droneService: DroneService,
              private localNotifications: LocalNotifications,
              private ibeacon: IBeacon,
              private uniqueDeviceID: UniqueDeviceID) {
    this.gps = droneService.gps;
    this.uniqueDeviceID.get()
  .then((uuid: any) => {
    console.log('Device UUId Extraction started successfully');
    this.droneService.emitBeacon(uuid).subscribe((data) => {
      console.log('UUID :----- : ' + JSON.stringify(data));
      this.uuid = uuid;
    }
    );
  })
  .catch((error: any) => console.log(error));
    Pusher.logToConsole = true;

    const pusher = new Pusher('980f167a4cd9ef7b753c', {
         cluster: 'ap2',
         forceTLS: true
       });

    const channel = pusher.subscribe('my-channel');
    channel.bind('my-event', (obj) => {
        this.current.lat = obj.latitude;
        this.current.lng = obj.longitude;
        this.vicinity = obj.vicinity;
        if (this.vicinity === true) {
          console.log('Beacon Emitting started.................');
          // Request permission to use location on iOS
          this.ibeacon.requestAlwaysAuthorization();
// create a new delegate and register it with the native layer
          const delegate = this.ibeacon.Delegate();

// Subscribe to some of the delegate's event handlers
          delegate.didRangeBeaconsInRegion()
  .subscribe(
    data => console.log('didRangeBeaconsInRegion: ', data),
    error => console.error()
  );
          delegate.didStartMonitoringForRegion()
  .subscribe(
    data => console.log('didStartMonitoringForRegion: ', data),
    error => console.error()
  );
          delegate.didEnterRegion()
  .subscribe(
    data => {
      console.log('didEnterRegion: ', data);
    }
  );

          const beaconRegion = this.ibeacon.BeaconRegion('deskBeacon', this.uuid);

          this.ibeacon.startMonitoringForRegion(beaconRegion)
  .then(
    () => console.log('Native layer received the request to monitoring'),
    error => console.error('Native layer failed to begin monitoring: ', error)
  );


        }

        this.marker = new google.maps.Marker({
          position: {
            lat: obj.latitude,
            lng: obj.longitude,
          },
          map: this.map,
          icon: this.image,
          });
        setTimeout(() => {
            this.marker.setMap(null);
          }, 1000);
       });
      //  marker.setAnimation(null);
  }

  ngOnInit(): void {
    console.log(JSON.stringify(this.droneService.gps));
    this.flightPlanCoordinates = [
      {lat: this.gps.src.lat, lng: this.gps.src.lng},
      {lat: this.gps.des.lat, lng: this.gps.des.lng},
    ];
    this.current = { lat: this.gps.src.lat, lng: this.gps.src.lng};

    setTimeout(() => {
      console.log('Pushed notification');
      this.localNotifications.schedule({
        id: 1,
        text: 'Drone Delivery Update',
        sound: '../assets/music/push-notification.mp3',
        data: 'Testing notifications!'
      });
    }, 10000);

    this.map = new google.maps.Map(
      this.mapElement.nativeElement,
      {
        center: {lat: this.gps.src.lat, lng: this.gps.src.lng},
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
    lng: this.gps.src.lng
  }, map: this.map, icon: '../assets/icon/drone.png',
  animation: google.maps.Animation.BOUNCE});
    this.marker = new google.maps.Marker({position: {
    lat: this.gps.des.lat,
    lng: this.gps.des.lng
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
