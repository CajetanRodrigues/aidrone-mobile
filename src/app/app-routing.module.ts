import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { LoginPage } from './authentication/login/login.page';
import { SignupPage } from './authentication/signup/signup.page';
import { MapPage } from './map/map.page';
import { MissionsPage } from './missions/missions.page';
import { DronesPage } from './drones/drones.page';
import { InventoryPage } from './inventory/inventory.page';
import { SchedulePage } from './schedule/schedule.page';
import { InProgressPage } from './in-progress/in-progress.page';
import { DronesPageModal } from './temporary-ui/drones/drones.page';
import { FlightParametersPage } from './temporary-ui/flight-parameters/flight-parameters.page';
import { TrackPage } from './track/track.page';
import { AuthGuardService } from './services/auth/auth-guard.service';
import { PersonDroneAnimationPage } from './person-drone-animation/person-drone-animation.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomePage,
    canActivate: [AuthGuardService]
  },
  { path: 'map/:id',
    component: MapPage,
  },
  { path: 'login',
    component: LoginPage,
  },
  { path: 'signup',
    component: SignupPage,
  },
  { path: 'missions',
    component: MissionsPage,
    canActivate: [AuthGuardService]
  },
  { path: 'drones',
    component: DronesPage,
    canActivate: [AuthGuardService]

  },
  { path: 'inventory',
    component: InventoryPage,
    canActivate: [AuthGuardService]
  },
  { path: 'schedule',
    component: SchedulePage,
    canActivate: [AuthGuardService]
  },
  { path: 'in-progress',
    component: InProgressPage,
    canActivate: [AuthGuardService]
  },
  { path: 'track',
    component: TrackPage,
    canActivate: [AuthGuardService]
  },
  { path: 'drones-modal',
    component: DronesPageModal,
    canActivate: [AuthGuardService]
  },
  { path: 'flight-parameters/:missionId',
    component: FlightParametersPage,
    canActivate: [AuthGuardService]
  },
  { path: 'person-drone-animation',
  component: PersonDroneAnimationPage
  },
  { path: 'mission-detail', loadChildren: './missions/mission-detail/mission-detail.module#MissionDetailPageModule' },

  { path: '**', redirectTo: 'person-drone-animation' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
