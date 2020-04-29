import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, LoadingController } from '@ionic/angular';
import { Inventory } from '../models/Inventory';
import { AppService } from '../app.service';
import { ToastController } from '@ionic/angular';
import { InventoryService } from '../services/inventory.service';
import { ScheduleService } from '../services/schedule.service';


@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.page.html',
  styleUrls: ['./inventory.page.scss'],
})
export class InventoryPage implements OnInit {
  inventoryList: Inventory[];
  units = 1;
  tempUserBag = [];
  showProgress = true;
  constructor(private router: Router,
              public modalController: ModalController,
              public appService: AppService,
              public toastController: ToastController,
              private inventoryService: InventoryService,
              private scheduleService: ScheduleService,
              private loadingController: LoadingController) { }

  ngOnInit() {
    // this.inventoryList = this.appService.inventoryList;
    this.inventoryService.fetchInventoryItems().subscribe(
      data => {
        this.inventoryList = data;
      }
    );
    if (this.tempUserBag) {
      this.inventoryList = this.tempUserBag;
    }
       // direct to schedule
    setTimeout(() => {
        this.showProgress = false;
      }, 1200);
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
  onNavigate() {

    this.presentLoading();
    this.inventoryService.tempUserBag = this.tempUserBag;
    this.router.navigateByUrl('schedule');
  }
  onAddItem(inventory: Inventory, units: number) {
    this.tempUserBag.push({
      _id: inventory._id,
      name: inventory.name,
      units: inventory.units,
      weight: inventory.weight,
      availability: inventory.availability,
      image: inventory.image
    });
    this.presentToast(inventory.name);
  }
  async presentToast(name: string) {
    const toast = await this.toastController.create({
      message: name + ' has been added successfully to cart',
      duration: 500
    });
    toast.present();
  }

}


