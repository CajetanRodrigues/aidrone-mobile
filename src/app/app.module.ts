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
import { GooglemapsService } from './services/googlemaps.service';
import { DroneService } from './services/drone.service';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { IBeacon } from '@ionic-native/ibeacon/ngx';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { MissionsPageModule } from './missions/missions.module';
import { DronesPageModule } from './drones/drones.module';
import { InventoryPageModule } from './inventory/inventory.module';
import { SchedulePageModule } from './schedule/schedule.module';
import { AppService } from './app.service';
import { DronesPage } from './drones/drones.page';
import { InProgressPageModule } from './in-progress/in-progress.module';
import { DronesPageModal } from './temporary-ui/drones/drones.page';
import { DronesPageModalModule } from './temporary-ui/drones/drones.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [DronesPage, DronesPageModal],
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
    MissionsPageModule,
    DronesPageModule,
    InventoryPageModule,
    SchedulePageModule,
    InProgressPageModule,
    DronesPageModalModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    UserService,
    GooglemapsService,
    DroneService,
    LocalNotifications,
    IBeacon,
    UniqueDeviceID,
    AppService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
