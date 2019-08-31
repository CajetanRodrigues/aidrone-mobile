import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  private selectedItem: any;
  private icons = [
    'flask',
    'wifi',
    'beer',
    'football',
    'basketball',
    'paper-plane',
    'american-football',
    'boat',
    'bluetooth',
    'build'
  ];
  public params: Array<{ latitude: number; longitude: number; altitude: number; velocity: number }> = [];
  constructor() {
    for (let i = 1; i < 11; i++) {
      this.params.push({
        latitude: 1*i,
        longitude: 3*i,
        altitude: 1*i,
        velocity: 8
      });
    }
  }

  ngOnInit() {
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
