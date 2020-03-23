import { Component, OnInit, OnChanges, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { DronesPage } from '../drones/drones.page';
import { DroneService } from '../services/drone.service';
import { AppService } from '../app.service';
import { Inventory } from '../models/Inventory';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit, DoCheck {
  public weightStatus = false;
  public totalItemWeight = 0;
  public droneWeight = this.appService.schedule[0].capacity;
  public drone = this.appService.schedule[0];
  private activated = false;
  public inventoryList = this.appService.schedule.slice(1, this.appService.schedule.length);
  constructor(private router: Router,
              public modalController: ModalController,
              private droneService: DroneService,
              private appService: AppService) {
               }

  ngOnInit() {
    // this.inventoryList
    // .forEach( (item: any, index) => {
    //   console.log(JSON.stringify(item.weight * item.quantity));
    //   this.totalItemWeight = this.totalItemWeight + item.weight * item.quantity;
    // });
  }

  ngDoCheck() {
    this.weightStatus = true;
    this.totalItemWeight = 0;
    this.inventoryList
    .forEach( (item: any, index) => {
      console.log(JSON.stringify(item.weight * item.quantity));
      this.totalItemWeight = this.totalItemWeight + item.weight * item.quantity;
    });
    if (this.totalItemWeight > this.droneWeight) {
      this.weightStatus = false;
    } else {
      this.weightStatus = true;
    }
    console.log(this.weightStatus);
  }
  goToMap() {
    this.droneService.deliverPacket(this.droneService.gps);
    this.router.navigateByUrl('in-progress');
  }
  onRemove(inventory: Inventory) {
    this.inventoryList.forEach( (item, index) => {
      console.log(JSON.stringify(item));
      if (item.id === inventory.id) { this.inventoryList.splice(index, 1); }
    });
  }
  onActivateSwarm()
  {
    this.activated = true;
  }
}
