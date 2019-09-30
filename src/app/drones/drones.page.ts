import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { DroneService } from '../services/drone.service';

@Component({
  selector: 'app-drones',
  templateUrl: './drones.page.html',
  styleUrls: ['./drones.page.scss'],
})
export class DronesPage implements OnInit {
  droneModalOpened = false;
  constructor(private router: Router,
              public modalController: ModalController,
              private droneService: DroneService) {
                this.droneModalOpened = this.droneService.droneModalOpened;
               }

  ngOnInit() {
  }
  goToInventory() {
    this.router.navigateByUrl('inventory');
  }
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'drone': {
        title: 'Beta',
        health: 'Healthy'
      }
    });
  }
}
