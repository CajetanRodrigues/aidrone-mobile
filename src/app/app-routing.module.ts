import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { LoginPage } from './authentication/login/login.page';
import { SignupPage } from './authentication/signup/signup.page';
import { MapPage } from './map/map.page';
import { ListPage } from './list/list.page';
import { MissionsPage } from './missions/missions.page';
import { DronesPage } from './drones/drones.page';
import { InventoryPage } from './inventory/inventory.page';
import { SchedulePage } from './schedule/schedule.page';
import { InProgressPage } from './in-progress/in-progress.page';
import { DronesPageModal } from './temporary-ui/drones/drones.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomePage
  },
  {
    path: 'list',
    component: ListPage
  },
  { path: 'map',
    component: MapPage
  },
  { path: 'login',
    component: LoginPage
  },
  { path: 'signup',
    component: SignupPage
  },
  { path: 'missions',
    component: MissionsPage },
  { path: 'drones',
    component: DronesPage },
  { path: 'inventory',
    component: InventoryPage },
  { path: 'schedule',
    component: SchedulePage },
  { path: 'in-progress',
    component: InProgressPage },
  { path: 'track',
    loadChildren: './track/track.module#TrackPageModule' },
  { path: 'drones-modal',
    component: DronesPageModal },
  { path: 'flight-parameters', loadChildren: './temporary-ui/flight-parameters/flight-parameters.module#FlightParametersPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
