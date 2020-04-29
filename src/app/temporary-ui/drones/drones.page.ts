import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AppService } from 'src/app/app.service';
import { MissionService } from 'src/app/services/mission.service';

@Component({
  selector: 'app-drones',
  templateUrl: './drones.page.html',
  styleUrls: ['./drones.page.scss'],
})
export class DronesPageModal implements OnInit {
  public drone = this.appService.schedule[0];
  public inventoryList = this.appService.schedule.slice(1, this.appService.schedule.length);
  orderList = [];
  constructor(private modalCtrl: ModalController,
              private appService: AppService,
              private missionService: MissionService) { }

  ngOnInit() {
    this.missionService.fetchOrders()
    .subscribe(data => {
      this.orderList = data;
    });
  }
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }
}
