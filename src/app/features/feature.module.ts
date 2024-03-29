import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureModuleRoute } from './feature-module.routes';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ComponentSideNav } from '../components/sidenav/sidenav.component';
import { ComponentPageHeader } from '../components/header/header.component';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import { NgChartsModule } from 'ng2-charts';
import { MatPaginatorModule } from '@angular/material/paginator';
//features compponent
import { DashboardComponent } from './daskboard/daskboard';
import { ListItemComponent } from './listitem/listitem';
import { UserComponent } from './user/user';

@NgModule({
  declarations: [ComponentSideNav, DashboardComponent, UserComponent, ListItemComponent],
  imports: [
    CommonModule,
    FeatureModuleRoute,
    ComponentPageHeader,
    // NG Material Modules
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    NgChartsModule,
    MatPaginatorModule
  ]
})
export class FeatureModule { }