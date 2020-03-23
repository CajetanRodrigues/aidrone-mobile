import { Injectable } from '@angular/core';
import { Inventory } from './models/Inventory';
import { Drone } from './models/Drone';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  public from = '';
  public to = '';
  droneModalOpened = false;
  public schedule: any = [
    {
      id: 2,
      name: 'Alpha',
      availability: true,
      capacity: 5
    },
    {
      id: 4,
      name: 'bandage',
      quantity: 2,
      availability: true,
      weight: 1,
    },
    {
      id: 5,
      name: 'dettol',
      quantity: 3,
      availability: true,
      weight: 2,
    },
    {
      id: 6,
      name: 'crocin',
      quantity: 7,
      availability: true,
      weight: 3,
    }
  ];
  droneList: Drone[] = [
    {
      id: 1,
      name: 'Alpha',
      availability: true,
      capacity: 5
    },
    {
      id: 2,
      name: 'Beta',
      availability: false,
      capacity: 2
    },
    {
      id: 3,
      name: 'Gamma',
      availability: true,
      capacity: 4
    }
  ];
  inventoryList: Inventory[] = [
    {
      id: 4,
      name: 'bandage',
      units: 10,
      availability: true,
      weight: 0.01
    },
    {
      id: 5,
      name: 'dettol',
      units: 20,
      availability: false,
      weight: 0.5
    },
    {
      id: 6,
      name: 'crocin',
      units: 100,
      availability: true,
      weight: 0.01
    },

  ];

  constructor() { }
}
