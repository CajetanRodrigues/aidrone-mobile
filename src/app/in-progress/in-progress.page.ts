import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit() {
    this.a = setInterval(() => {
      this.counter = this.counter + 1;
      if (this.counter === 6) {
        this.one = true;
      }
      if (this.counter === 12) {
        this.two = true;
      }
      if (this.counter === 18) {
        this.three = false;
      }
      if (this.counter === 24) {
        this.four = true;
      }
      if (this.counter === 24) {
        this.five = true;
      }
      if (this.counter === 24) {
        this.six = true;
      }
      if (this.counter === 30) {
        this.seven = true;
        this.spinner =  false;
      }
    }, 1000 );
  }

}
