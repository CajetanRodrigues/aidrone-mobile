import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.page.html',
  styleUrls: ['./inventory.page.scss'],
})
export class InventoryPage implements OnInit {

  constructor(private router: Router,
              public modalController: ModalController) { }

  ngOnInit() {
  }

  goToSchedule() {
    this.router.navigateByUrl('schedule');
  }

}


