import { Component, OnInit, OnChanges, DoCheck, SimpleChanges, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, LoadingController } from '@ionic/angular';
import { DronesPage } from '../drones/drones.page';
import { DroneService } from '../services/drone.service';
import { AppService } from '../app.service';
import { Inventory } from '../models/Inventory';
import { ScheduleService } from '../services/schedule.service';
import { InventoryService } from '../services/inventory.service';
import { MissionService } from '../services/mission.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit, DoCheck {
  private activated = false;
  public weightStatus = false;
  public totalItemWeight = 0;
  public droneWeight = this.appService.schedule[0].capacity;
  public drone = this.appService.schedule[0];
  public inventoryList = this.appService.schedule.slice(1, this.appService.schedule.length);
  assignList = [];
  droneCount = 0;
  droneCapacity = 0;
  inventoryCount = 0;
  inventoryWeight = 0;
  tempInventoryList = [];
  showProgress = true;
  constructor(private router: Router,
              public modalController: ModalController,
              private droneService: DroneService,
              private appService: AppService,
              private scheduleService: ScheduleService,
              private inventoryService: InventoryService,
              private missionService: MissionService,
              private loadingController: LoadingController){
               }

  ngOnInit() {
    setTimeout(() => {
      this.showProgress = false;
    }, 1200);
    // this.inventoryList
    // .forEach( (item: any, index) => {
    //   console.log(JSON.stringify(item.weight * item.quantity));
    //   this.totalItemWeight = this.totalItemWeight + item.weight * item.quantity;
    // });
    // console.log(this.inventoryService.tempUserBag);
    this.scheduleService.assignDronesToInventoryItems(this.inventoryService.tempUserBag)
    .subscribe(data => {
      this.assignList = data;
      console.log(this.assignList);
    });
  }
  onNavigateInventory() {
    this.presentLoading();
    this.router.navigateByUrl('inventory');
  }
  ngDoCheck() {
    // tslint:disable-next-line: forin
    this.droneCapacity = 0;
    this.droneCount = 0;
    this.inventoryCount = 0;
    this.inventoryWeight = 0;
    this.weightStatus = true;
    this.totalItemWeight = 0;
    this.droneCount = this.assignList.length;
    this.assignList
    .forEach( (item: any, index) => {
      this.droneCapacity = this.droneCapacity + item.drone_capacity;
    });
    this.assignList
    .forEach( (item: any, index) => {
      const list = item.inventoryItems;
      this.inventoryCount = this.inventoryCount + list.length;

      list
      .forEach( (listItem: any, index) => {
        this.inventoryWeight = this.inventoryWeight + listItem.inventory_weight * listItem.quantity;
      });
    });
    if (this.inventoryWeight > this.droneCapacity) {
      this.weightStatus = false;
    } else {
      this.weightStatus = true;
    }

  }
  onActivateSwarm() {
    this.tempInventoryList = this.assignList;
    this.reAssignDrones();
  }
  helper(): Promise<any> {
    return new Promise((resolve) => {
      console.log('in helper')
      this.calculateNewInputOfInventoryItems();
    });
  }
  calculateNewInputOfInventoryItems() {
    console.log('in calculateNewInputOfInventoryItems');
    this.assignList
    .forEach( (drone: any, index) => {
      console.log(this.tempInventoryList);
      this.tempInventoryList = this.tempInventoryList.concat(drone.inventoryItems);
    });
  }
  reAssignDrones() {
    console.log('in reAssignDrones')

    this.helper().then((data) => {
      console.log('temp list is :');
      console.log(this.tempInventoryList);
      this.fetchData();
    });
  }
  fetchData() {
    console.log('in fetchData')

    this.scheduleService.assignDronesToInventoryItems(this.tempInventoryList)
    .subscribe(data => {
      console.log('My new data, wohh');
      console.log(data);
      this.assignList = data;
    });
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
  goToMap() {
    this.scheduleMission();
    this.presentLoading();
    console.log('this is what im sendin in gotomap');
    console.log(this.assignList);
    this.router.navigateByUrl('in-progress');
    // this.router.navigateByUrl('in-progress');
  }
  onRemove(inventory: Inventory) {
    this.inventoryList.forEach( (item, index) => {
      console.log(JSON.stringify(item));
      if (item.id === inventory._id) { this.inventoryList.splice(index, 1); }
    });
  }
  // The below code executes sequentially by first creating an order, mission and 
  // then actually starting a mission
  scheduleMission() {
    this.createOrder();
    setTimeout(() => {
      this.createMission();
      setTimeout(() => {
        console.log("did i reach?")
        this.takeOffDrone();
      }, 500);
    }, 500);
  }

  createOrder() {
    this.missionService.createOrder(this.assignList)
    .subscribe((data) => {
      console.log('Order created successfully and id is ' + data.orderId);
      this.appService.orderId = data.orderId;
    });
  }

  createMission() {
    this.missionService.createMission(this.appService.orderId)
    .subscribe((data) => {
      console.log('mission created successfully and mission id is ' + data.mission_id);
      this.appService.missionId = data.mission_id;
      localStorage.setItem("missionId", data.mission_id);
      localStorage.setItem("msg", 'fuck oddd');
    }
    );
  }
  takeOffDrone() {
    console.log('takoff drone:' + this.appService.missionId);
    console.log('hey!!!!!!!!!!! started the mission, but will return the data later');
    this.droneService.deliverPacket(this.droneService.gps, this.appService.missionId)
    .subscribe((data) => {
      console.log('/coordinates called successfully ...data :' + data);
    });
  }

}
