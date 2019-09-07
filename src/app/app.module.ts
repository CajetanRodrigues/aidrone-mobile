import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user.service';
import { HomePageModule } from './home/home.module';
import { LoginPageModule } from './authentication/login/login.module';
import { ListPageModule } from './list/list.module';
import { SignupPageModule } from './authentication/signup/signup.module';
import { MapPageModule } from './map/map.module';
import { AutoCompletePage } from './map/auto-complete/auto-complete.page';
import { AutoCompletePageModule } from './map/auto-complete/auto-complete.module';
import { AgmCoreModule } from '@agm/core';
import { GooglemapsService } from './services/googlemaps.service';
import { DroneService } from './services/drone.service';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [AutoCompletePage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HomePageModule,
    LoginPageModule,
    SignupPageModule,
    ListPageModule,
    MapPageModule,
    AutoCompletePageModule,

  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    UserService,
    GooglemapsService,
    DroneService,
    LocalNotifications
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
