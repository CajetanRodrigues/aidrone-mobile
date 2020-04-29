import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MissionService } from 'src/app/services/mission.service';

@Component({
  selector: 'app-mission-detail',
  templateUrl: './mission-detail.page.html',
  styleUrls: ['./mission-detail.page.scss'],
})
export class MissionDetailPage implements OnInit {
  @Input() missionInfo: any;
  constructor(public modalController: ModalController,
              private missionService: MissionService) { }

  ngOnInit() {
    console.log(this.missionInfo.From);

  }
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      dismissed: true
    });
  }
}
