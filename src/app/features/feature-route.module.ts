import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './daskboard/daskboard';
// import { InfoComponent } from './components/info/info.component';
// import { UserComponent } from './components/user/user.component';
import { ComponentSideNav } from './components/sidenav/sidenav.component';

const routes: Routes = [
  // Sidenavwrapper Component acts like a shell & the active child Component gets rendered into the <router-outlet>
  {
    path: '',
    component: ComponentSideNav,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      
    ]
  },
  {
    path: '**',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureRouteModule { }