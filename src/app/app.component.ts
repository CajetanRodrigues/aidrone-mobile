import { Component } from '@angular/core';

import { Platform, LoadingController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Inventory } from './models/Inventory';
import { Drone } from './models/Drone';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Dashboard',
      url: '/home',
      icon: '../assets/icon/today-sharp.svg'
    },
    {
      title: 'Missions',
      url: '/missions',
      icon: '../assets/icon/paper-plane-sharp.svg'
    },
    {
      title: 'Drone Stats',
      url: '/drones',
      icon: '../assets/icon/airplane-sharp.svg'
    },
    {
      title: 'Log out',
      url: '/login',
      icon: '../assets/icon/caret-back-circle-sharp.svg'
    }

  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private loadingController: LoadingController
  ) {
    this.initializeApp();
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 400
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }
  navigate(url: string) {
    this.presentLoading();
    if (url === '/login') {
      localStorage.setItem('token', 'false');
      this.router.navigateByUrl(url);
    } else {
      this.router.navigateByUrl(url);
    }

  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
