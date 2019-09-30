import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { DronesPage } from '../drones/drones.page';
import { DroneService } from '../services/drone.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {

  drones = [
    {
      title : 'Alpha',
      health: 'Healthy'
    },
  ];
  constructor(private router: Router,
              public modalController: ModalController,
              private droneService: DroneService) { }

  ngOnInit() {
  }
  goToMap() {
    this.router.navigateByUrl('map');
  }
  async presentModal() {
    this.droneService.droneModalOpened  = true;
    const modal = await this.modalController.create({
      component: DronesPage
    });
    return await modal.present().then(async () => {
      const { data } = await modal.onWillDismiss();
      console.log(data);
      this.drones.push(data.drone);
    });
  }

}
