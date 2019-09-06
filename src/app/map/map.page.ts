import { Component, OnInit, ViewChild, ElementRef, NgZone, AfterContentInit } from '@angular/core';
import { NavController, ModalController, LoadingController } from '@ionic/angular';
import { AutoCompletePage } from './auto-complete/auto-complete.page';
import { MapsAPILoader } from '@agm/core';
import { FormControl } from '@angular/forms';
import {} from 'googlemaps';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit, AfterContentInit {
  map;
  @ViewChild('mapElement',{static: true}) mapElement;

  uluru = {lat: -34.397, lng: 150.644};
  marker: any;
  flightPlanCoordinates = [];
  flightPath: any;
  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    this.map = new google.maps.Map(
        this.mapElement.nativeElement,
        {
          center: {lat: -34.397, lng: 150.644},
          zoom: 8
        });
    this.marker = new google.maps.Marker({position: this.uluru, map: this.map});
    this.flightPlanCoordinates = [
      {lat: -34.397, lng: 150.644},
      {lat: -35.397, lng: 150.645},
    ];
    this.flightPath = new google.maps.Polyline({
      path: this.flightPlanCoordinates,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });
    this.flightPath.setMap(this.map);
  }
}
