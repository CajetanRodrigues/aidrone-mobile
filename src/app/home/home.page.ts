import { Component, NgZone } from '@angular/core';
import * as Pusher from 'pusher-js';
import { LoadingController } from '@ionic/angular';
import { GooglemapsService } from '../services/googlemaps.service';
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
  autocomplete: any;
  autocomplete1: any;
  GoogleAutocomplete: any;
  GooglePlaces: any;
  geocoder: any
  autocompleteItems: any;
  autocompleteItems1: any;
  nearbyItems: any = new Array<any>();
  loading: any;
  lat = 51.678418;
  lng = 7.809007;

  constructor(    public zone: NgZone,
    public loadingCtrl: LoadingController,
    public googlemaps : GooglemapsService) {
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
       this.geocoder = new google.maps.Geocoder;
       let elem = document.createElement("div")
       this.GooglePlaces = new google.maps.places.PlacesService(elem);
       this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
       this.autocomplete = {
         input: ''
       };
       this.autocomplete1 = {
        input: ''
      };
       this.autocompleteItems = [];
       this.autocompleteItems1 = [];
       this.loading = this.loadingCtrl.create();
  }

  updateSearchResults(){
    if (this.autocomplete.input == '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
      (predictions, status) => {
        this.autocompleteItems = [];
        if(predictions){
          this.zone.run(() => {
            predictions.forEach((prediction) => {
              this.autocompleteItems.push(prediction);
            });
          });
        }
    });
  }
  updateToFieldResults(){
    if (this.autocomplete1.input == '') {
      this.autocompleteItems1 = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete1.input },
      (predictions, status) => {
        this.autocompleteItems1 = [];
        if(predictions){
          this.zone.run(() => {
            predictions.forEach((prediction) => {
              this.autocompleteItems1.push(prediction);
            });
          });
        }
    });
  }

  selectSearchResult(item){
    // this.loading.present();
    this.autocompleteItems = [];
    this.geocoder.geocode({'placeId': item.place_id}, (results, status) => {
      if(status === 'OK' && results[0]){
        this.autocompleteItems = [];
        this.GooglePlaces.nearbySearch({
          location: results[0].geometry.location,
          radius: '1000',
          types: ['places'],
          key: 'AIzaSyCWa1dUXh6EPJGRFxm4VPKKH6L4ZDF1F1o'
        }, (near_places) => {
          this.zone.run(() => {
            this.nearbyItems = [];
            console.log(this.nearbyItems);
            for (var i = 0; i < near_places.length; i++) {
              this.nearbyItems.push(near_places[i]);
            }
            // this.loading.dismiss();
          });
        })
      }
    })
  }
  selectFrom(place: any) {
    this.selectSearchResult(place);
    console.log(JSON.stringify(place.description));
    this.autocomplete.input = place.description;
    this.autocompleteItems = [];
    console.log(JSON.stringify(place));
    this.googlemaps.getGeocoderResults()
    .subscribe((data: any) => {
      console.log(data.results);
      console.log(data.results[0].geometry.location.lat);
      console.log(data.results[0].geometry.location.lng);
    });

  }
  selectTo(place: any) {
    console.log(JSON.stringify(place.description));
    this.autocomplete1.input = place.description;
    this.autocompleteItems1 = [];
    this.googlemaps.getGeocoderResults()
    .subscribe((data: any) => {
      console.log(data.results);
      console.log(data.results[0].geometry.location.lat);
      console.log(data.results[0].geometry.location.lng);
    });
  }
}
