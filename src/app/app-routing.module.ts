import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePageModule } from './home/home.module';
import { HomePage } from './home/home.page';
import { LoginPage } from './authentication/login/login.page';
import { SignupPage } from './authentication/signup/signup.page';
import { MapPage } from './map/map.page';
import { ListPage } from './list/list.page';
import { AutoCompletePage } from './map/auto-complete/auto-complete.page';

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
  { path: 'map', component: MapPage },
  { path: 'login', component: LoginPage},
  { path: 'signup', component: SignupPage },
  { path: 'auto-complete', component: AutoCompletePage }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
