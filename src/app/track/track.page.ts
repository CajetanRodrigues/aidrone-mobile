import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { DronesPageModal} from '../temporary-ui/drones/drones.page';

@Component({
  selector: 'app-track',
  templateUrl: './track.page.html',
  styleUrls: ['./track.page.scss'],
})
export class TrackPage implements OnInit {

  constructor(private router: Router,
              public modalController: ModalController) { }

  ngOnInit() {
  }
  goToMap() {
    this.router.navigateByUrl('map');
  }
  goToLiveFlightParametersPage() {
    this.router.navigateByUrl('flight-parameters');
  }
  goToDronesPage() {
    this.router.navigateByUrl('drones-modal');
  }
  goToMissionsPage() {
    this.router.navigateByUrl('missions');
  }
  goToHomePage() {
    this.router.navigateByUrl('home');
  }
}
