import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-missions',
  templateUrl: './missions.page.html',
  styleUrls: ['./missions.page.scss'],
})
export class MissionsPage implements OnInit {
  missions: any[];
  constructor() { }

  ngOnInit() {
    // Add the mission object to observable
    // Make a mission observable in app service page, make a subscriber over here.
    // So whenever I emit an event there, the subscriber will be able to hear over here
    this.missions = [
      {
        id : 1,
        name: 'alpha',
        availability: NaN, // as this will be a past mission and will not represent true availability
        capacity: 5,
        inventoryItems : [
          {
            id: '15',
            name: 'Bandage',
            availability: true,
            units: 5,
            weight: 0.01,
            image: 'AWS S3 Image link'
          },
          {
            id: '15',
            name: 'Dettol',
            availability: true,
            units: 2,
            weight: 5,
            image: 'AwS s3 Image link'
          }
        ],
        totalWeightOfInventoryItems: 5.01,
        dateOfMission: 'Sunday, 22 March 2020',
        timeOfDeparture: '2:10 pm',
        timeOfDelivery: '2:30 pm',
        timeOfArrival: '2:50 pm',
        distanceTravelled: '1000 m',
        from: 'Fr Agnel',
        to: 'Taj Lands end',
        droneImage: 'AWS S3 Image Link',
        clientPhotograph: 'AWS S3 Image Link',
        waypoints: [
          {
            lat: '',
            lon: ''
          },
          {
            lat: '',
            lon: ''
          },
          {
            lat: '',
            lon: ''
          }
        ]
      }
    ];
  }

}
