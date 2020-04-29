import { Component, OnInit } from '@angular/core';
import { MissionService } from '../services/mission.service';
import { ModalController } from '@ionic/angular';
import { MissionDetailPage } from './mission-detail/mission-detail.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-missions',
  templateUrl: './missions.page.html',
  styleUrls: ['./missions.page.scss'],
})
export class MissionsPage implements OnInit {
  missions: any[];
  constructor(private missionService: MissionService,
              public modalController: ModalController,
              private router: Router) { }

  ngOnInit() {
    this.missionService.fetchMissions()
    .subscribe(data => {
      console.log(data);
      this.missions = data;
    });

    this.missionService.fetchInventoryItems()
    .subscribe(data => {
      console.log(data);
    });
    // Add the mission object to observable
    // Make a mission observable in app service page, make a subscriber over here.
    // So whenever I emit an event there, the subscriber will be able to hear over here

  }
  async presentModal(mission: any) {

    const modal = await this.modalController.create({
      component: MissionDetailPage,
      componentProps:  {
        missionInfo: mission
      }
    });
    return await modal.present();
  }
  goToMap(missionId: string) {
    console.log(missionId);
    this.router.navigateByUrl('map/' + missionId);
  }
}
