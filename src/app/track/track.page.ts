import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { DronesPageModal} from '../temporary-ui/drones/drones.page';
import { AppService } from '../app.service';

@Component({
  selector: 'app-track',
  templateUrl: './track.page.html',
  styleUrls: ['./track.page.scss'],
})
export class TrackPage implements OnInit {
  showProgress = true;

  constructor(private router: Router,
              public modalController: ModalController,
              private appService: AppService) { }

  ngOnInit() {
    setTimeout(() => {
      this.showProgress = false;
    }, 1200);
  }
  goToMap() {
    this.router.navigateByUrl('map/' + this.appService.missionId);
  }
  goToLiveFlightParametersPage() {
    this.router.navigateByUrl('flight-parameters/' + this.appService.missionId);
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
