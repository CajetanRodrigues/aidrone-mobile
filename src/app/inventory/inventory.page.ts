import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Inventory } from '../models/Inventory';
import { AppService } from '../app.service';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.page.html',
  styleUrls: ['./inventory.page.scss'],
})
export class InventoryPage implements OnInit {
  inventoryList: Inventory[];
  constructor(private router: Router,
              public modalController: ModalController,
              public appService: AppService,
              public toastController: ToastController) { }

  ngOnInit() {
    this.inventoryList = this.appService.inventoryList;
  }
  onNavigate() {
    // direct to schedule
    this.router.navigateByUrl('schedule');
  }
  onAddItem(inventory: Inventory) {
    // add inventory items to schedule object
    this.appService.schedule.push({
      id: inventory.id,
      name: inventory.name,
      quantity: 2,
      weight: inventory.weight,
      availability: inventory.availability
    });
    // present a toast
    this.presentToast(inventory.name);
  }
  async presentToast(name: string) {
    const toast = await this.toastController.create({
      message: name + ' has been added successfully to cart',
      duration: 2000
    });
    toast.present();
  }

}


