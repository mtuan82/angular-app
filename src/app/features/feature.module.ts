import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureRouteModule } from './feature-route.module';
import { DashboardComponent } from './daskboard/daskboard';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ComponentSideNav } from './components/sidenav/sidenav.component';
import { ComponentPageHeader } from './components/header/header.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [ComponentSideNav, DashboardComponent, ComponentPageHeader],
  imports: [
    CommonModule,
    FeatureRouteModule,

    // NG Material Modules
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatButtonModule, 
  ]
})
export class FeatureModule { }