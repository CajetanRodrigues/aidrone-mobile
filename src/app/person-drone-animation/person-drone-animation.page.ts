import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-person-drone-animation',
  templateUrl: './person-drone-animation.page.html',
  styleUrls: ['./person-drone-animation.page.scss'],
})
export class PersonDroneAnimationPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
               setTimeout(() => {
      this.router.navigateByUrl('track');
    }, 5000);
  }

}
