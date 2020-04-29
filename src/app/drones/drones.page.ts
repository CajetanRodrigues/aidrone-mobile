import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { DroneService } from '../services/drone.service';
import { Drone } from '../models/Drone';
import { AppService } from '../app.service';

@Component({
  selector: 'app-drones',
  templateUrl: './drones.page.html',
  styleUrls: ['./drones.page.scss'],
})
export class DronesPage implements OnInit {
  droneModalOpened = false;
  droneList: Drone[];
  constructor(private router: Router,
              public modalController: ModalController,
              private droneService: DroneService,
              public appService: AppService) {
                this.droneModalOpened = this.droneService.droneModalOpened;
                this.droneList = this.appService.droneList;
               }

  ngOnInit() {
  this.droneService.getDrones()
  .subscribe((data) => {
    this.droneList = data;
    console.log(data);
  });
  }
  goToInventory(drone: Drone) {

    // add drone to schedule object
    this.appService.schedule.push({
      name: drone.name,
      availability: drone.availability,
      capacity: drone.capacity
    });
    // direct to inventory page
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
