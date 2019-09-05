import { Component, OnInit, NgZone } from '@angular/core';
import { ViewController } from '@ionic/core';
import { ModalController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.page.html',
  styleUrls: ['./auto-complete.page.scss'],
})
export class AutoCompletePage {
  autocomplete: any;
  GoogleAutocomplete: any;
  GooglePlaces: any;
  geocoder: any
  autocompleteItems: any;
  nearbyItems: any = new Array<any>();
  loading: any;

  constructor(
    public zone: NgZone,
    public loadingCtrl: LoadingController
  ) {

    this.geocoder = new google.maps.Geocoder;
    let elem = document.createElement("div")
    this.GooglePlaces = new google.maps.places.PlacesService(elem);
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = {
      input: ''
    };
    this.autocompleteItems = [];
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
  goToHome(place: any) {
    console.log(JSON.stringify(place));
  }
}
