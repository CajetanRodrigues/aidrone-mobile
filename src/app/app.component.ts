import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

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
      icon: 'today'
    },
    {
      title: 'Map View',
      url: '/map',
      icon: 'map'
    },
    {
      title: 'Missions',
      url: '/missions',
      icon: 'airplane'
    },
    {
      title: 'Drones',
      url: '/drones',
      icon: 'nuclear'
    },
    {
      title: 'Inventory',
      url: '/inventory',
      icon: 'cube'
    },
    {
      title: 'Schedule',
      url: '/schedule',
      icon: 'construct'
    },
    {
      title: 'Final Checkout',
      url: '/in-progress',
      icon: 'aperture'
    },
    {
      title: 'Log out',
      url: '/login',
      icon: 'log-out'
    }

  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
