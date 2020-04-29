import { Component, NgZone, OnInit, OnDestroy } from '@angular/core';
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
export class HomePage implements OnInit, OnDestroy {


  
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
  fetchAddress = '';
  startAddress = '';
  show = false;
  showProgress = true;
  constructor(    public zone: NgZone,
                  public loadingCtrl: LoadingController,
                  public googlemapsService: GooglemapsService,
                  public droneService: DroneService,
                  public router: Router,
                  public modalController: ModalController,
                  public appService: AppService,
                  public loadingController: LoadingController) {

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
  ngOnInit(): void {
    setTimeout(() => {
      this.showProgress = false
    }, 1200);
  }
  ngOnDestroy(): void {
    this.autocomplete.input = '';
    this.autocomplete1.input = '';
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 200
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  findMe() {
    this.show = true;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
        const geocoder = new google.maps.Geocoder;
        const latlng = {lat: position.coords.latitude, lng: position.coords.longitude};
        geocoder.geocode({location: latlng}, (results, status) => {
        this.fetchAddress = results[0].formatted_address
        console.log('Findme address : ' + results[0].formatted_address);
        this.autocomplete.input = 'Latitude: ' + position.coords.latitude.toString() +
         ' | ' + 'Longitude :' + position.coords.longitude.toString();
        this.droneService.gps.src.lat = position.coords.latitude;
        this.droneService.gps.src.lng = position.coords.longitude;
});
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
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
          key: 'AIzaSyDAyTW-4duB-d0o4-KjnsTggnG_ihl0N5M'
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
      console.log('src coords');
      console.log(data.results[0].geometry.location.lat);
      console.log(data.results[0].geometry.location.lng);
      console.log('#1');
      console.log(data);
    });

  }
  selectTo(place: any) {
    this.autocomplete1.input = place.description;
    this.autocompleteItems1 = [];
    this.googlemapsService.getGeocoderResults(place.description)
    .subscribe((data: any) => {
      console.log('des coords');

      this.des.lat = data.results[0].geometry.location.lat;
      this.des.lng = data.results[0].geometry.location.lng;
      console.log(data.results[0].geometry.location.lat);
      console.log(data.results[0].geometry.location.lng);
    });
  }
  deliver() {
    
    this.presentLoading();
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
    this.droneService.gps.src.lat = data.src.lat;
    this.droneService.gps.src.lng = data.src.lng;
    this.droneService.gps.des.lat = data.des.lat;
    this.droneService.gps.des.lng = data.des.lng;
    console.log('#2');
    console.log(this.droneService.gps);
    this.router.navigateByUrl('inventory');
  }
}
