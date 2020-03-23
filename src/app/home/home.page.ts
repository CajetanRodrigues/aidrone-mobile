import { Component, NgZone } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { GooglemapsService } from '../services/googlemaps.service';
import { DroneService } from '../services/drone.service';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

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

  params: Param[] = [];
  autocomplete: any;
  autocomplete1: any;
  GoogleAutocomplete: any;
  GooglePlaces: any;
  geocoder: any;
  autocompleteItems: any;
  autocompleteItems1: any;
  nearbyItems: any = new Array<any>();
  loading: any;
  lat = 51.678418;
  lng = 7.809007;
  src = {
    lat : 19.044497,
    lng : 72.8204535
  };
  des = {
    lat : 19.046998,
    lng : 72.81965559999999
  };
  constructor(    public zone: NgZone,
                  public loadingCtrl: LoadingController,
                  public googlemapsService: GooglemapsService,
                  public droneService: DroneService,
                  public router: Router,
                  public modalController: ModalController,
                  public appService: AppService) {

       this.geocoder = new google.maps.Geocoder;
       const elem = document.createElement('div');
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
  updateSearchResults() {
    if (this.autocomplete.input === '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
      (predictions, status) => {
        this.autocompleteItems = [];
        if (predictions) {
          this.zone.run(() => {
            predictions.forEach((prediction) => {
              this.autocompleteItems.push(prediction);
            });
          });
        }
    });
  }
  updateToFieldResults() {
    if (this.autocomplete1.input === '') {
      this.autocompleteItems1 = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete1.input },
      (predictions, status) => {
        this.autocompleteItems1 = [];
        if (predictions) {
          this.zone.run(() => {
            predictions.forEach((prediction) => {
              this.autocompleteItems1.push(prediction);
            });
          });
        }
    });
  }

  selectSearchResult(item) {
    // this.loading.present();
    this.autocompleteItems = [];
    this.geocoder.geocode({placeId: item.place_id}, (results, status) => {
      if (status === 'OK' && results[0]) {
        this.autocompleteItems = [];
        this.GooglePlaces.nearbySearch({
          location: results[0].geometry.location,
          radius: '1000',
          types: ['places'],
          key: 'AIzaSyCWa1dUXh6EPJGRFxm4VPKKH6L4ZDF1F1o'
        }, (near_places) => {
          this.zone.run(() => {
            this.nearbyItems = [];
            for (let i = 0; i < near_places.length; i++) {
              this.nearbyItems.push(near_places[i]);
            }
            // this.loading.dismiss();
          });
        });
      }
    });
  }
  selectFrom(place: any) {
    this.autocomplete.input = place.description;
    this.autocompleteItems = [];
    this.googlemapsService.getGeocoderResults(place.description)
    .subscribe((data: any) => {
      this.src.lat = data.results[0].geometry.location.lat;
      this.src.lng = data.results[0].geometry.location.lng;
      console.log(data.results[0].geometry.location.lat);
      console.log(data.results[0].geometry.location.lng);
    });

  }
  selectTo(place: any) {
    this.autocomplete1.input = place.description;
    this.autocompleteItems1 = [];
    this.googlemapsService.getGeocoderResults(place.description)
    .subscribe((data: any) => {
      this.des.lat = data.results[0].geometry.location.lat;
      this.des.lng = data.results[0].geometry.location.lng;
      console.log(data.results[0].geometry.location.lat);
      console.log(data.results[0].geometry.location.lng);
    });
  }
  deliver() {
    this.appService.from = this.autocomplete.input;
    this.appService.to = this.autocomplete1.input;
    const data = {
      src:  this.src,
      des: this.des
    };
    // console.log(data);
    // this.droneService.deliverPacket(data).subscribe(
    //   (info: any) => {
    //     console.log(info);
    //   }
    // );
    // this.googlemapsService.emitGPSObservable(data);
    this.droneService.gps = data;
    this.router.navigateByUrl('inventory');
  }
}
