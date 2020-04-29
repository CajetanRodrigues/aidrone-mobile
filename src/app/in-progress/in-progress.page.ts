import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-in-progress',
  templateUrl: './in-progress.page.html',
  styleUrls: ['./in-progress.page.scss'],
})
export class InProgressPage implements OnInit {
  one = false;
  two = false;
  three = false;
  four = false;
  five = false;
  six = false;
  seven = false;
  counter = 0;
  spinner = true;
  a: any;
  data: any;

  ionViewWillEnter() {
    setTimeout(() => {
      this.data = {
        'heading': 'Normal text',
        'para1': 'Lorem ipsum dolor sit amet, consectetur',
        'para2': 'adipiscing elit.'
      };
    }, 5000);
  }
  constructor(private router: Router) { }

  ngOnInit() {
    this.a = setInterval(() => {
      this.counter = this.counter + 1;
      if (this.counter === 2) {
        this.one = true;
      }
      if (this.counter === 3) {
        this.two = true;
      }
      if (this.counter === 4) {
        this.three = false;
      }
      if (this.counter === 5) {
        this.four = true;
      }
      if (this.counter === 6) {
        this.five = true;
      }
      if (this.counter === 7) {
        this.six = true;
      }
      if (this.counter === 8) {
        this.seven = true;
        this.spinner =  false;
      }
      if (this.counter === 9) {
        this.router.navigateByUrl('person-drone-animation');
      }
    }, 1000 );
  }

}
