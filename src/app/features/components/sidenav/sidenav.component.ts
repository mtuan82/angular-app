import { BreakpointObserver } from '@angular/cdk/layout';
import { ComponentNav } from '../navigation/nav.component';
import { ComponentPageHeader } from '../header/header.component';
import { Component, NgZone, OnDestroy, OnInit, ViewChild, ViewEncapsulation, forwardRef } from '@angular/core';
import { ActivatedRoute, Params, RouterOutlet, Routes } from '@angular/router';
import { MatSidenav, MatSidenavModule, MatDrawerToggleResult } from '@angular/material/sidenav';
import { NavigationFocusService } from '../../../shared/navigation-focus/navigation-focus.service';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { NgIf, AsyncPipe } from '@angular/common';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-component-sidenav',
  templateUrl: 'sidenav.component.html',
  styleUrls: ['sidenav.component.scss'],
  standalone: false,
})

export class ComponentSideNav {
  isExpanded: boolean = false;

  constructor() { }
}
