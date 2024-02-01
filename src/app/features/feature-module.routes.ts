import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './daskboard/daskboard';
import { ListItemComponent } from './listitem/listitem';
import { UserComponent } from './user/user';
import { ComponentSideNav } from '../components/sidenav/sidenav.component';

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
      {
        path: 'listitem',
        component: ListItemComponent
      },
      {
        path: 'user',
        component: UserComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureModuleRoute { }