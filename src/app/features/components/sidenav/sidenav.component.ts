import { BreakpointObserver} from '@angular/cdk/layout';
import { ComponentNav } from '../navigation/nav.component';
import { ComponentPageHeader } from '../header/header.component';
import { Component, NgZone, OnDestroy, OnInit, ViewChild, ViewEncapsulation, forwardRef } from '@angular/core';
import { ActivatedRoute, Params, RouterOutlet, Routes } from '@angular/router';
import { MatSidenav, MatSidenavModule, MatDrawerToggleResult } from '@angular/material/sidenav';
import { NavigationFocusService } from '../../../shared/navigation-focus/navigation-focus.service';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { NgIf, AsyncPipe } from '@angular/common';
import { map } from 'rxjs/operators';

const EXTRA_SMALL_WIDTH_BREAKPOINT = 720;
const SMALL_WIDTH_BREAKPOINT = 959;

  @Component({
    selector: 'app-component-sidenav',
    templateUrl: 'sidenav.component.html',
    styleUrls: ['sidenav.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
      MatSidenavModule,
      NgIf,
      forwardRef(() => ComponentNav),
      ComponentPageHeader,
      RouterOutlet,
      // Footer,
      AsyncPipe,
    ],
  })

  export class ComponentSideNav implements OnInit, OnDestroy {
    @ViewChild(MatSidenav) sidenav!: MatSidenav;
    params: Observable<Params> | undefined;
    isExtraScreenSmall: Observable<boolean>;
    isScreenSmall: Observable<boolean>;
    private subscriptions = new Subscription();
  
    constructor(//public docItems: DocumentationItems,
                private _route: ActivatedRoute,
                private _navigationFocusService: NavigationFocusService,
                zone: NgZone,
                breakpoints: BreakpointObserver) {
      this.isExtraScreenSmall = breakpoints.observe(`(max-width: ${EXTRA_SMALL_WIDTH_BREAKPOINT}px)`)
                                .pipe(map(breakpoint => breakpoint.matches));
      this.isScreenSmall = breakpoints.observe(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`)
                                .pipe(map(breakpoint => breakpoint.matches));
    }
  
    ngOnInit() {
      // Combine params from all of the path into a single object.
      this.params = combineLatest(
          this._route.pathFromRoot.map(route => route.params), Object.assign);
  
      this.subscriptions.add(
        this._navigationFocusService.navigationEndEvents.pipe(map(() => this.isScreenSmall))
        .subscribe((shouldCloseSideNav) => {
            if (shouldCloseSideNav && this.sidenav) {
              this.sidenav.close();
            }
          }
        ));
    }
  
    ngOnDestroy() {
      this.subscriptions.unsubscribe();
    }
  
    toggleSidenav(sidenav: MatSidenav): Promise<MatDrawerToggleResult> {
      return sidenav.toggle();
    }
  }

  const routes: Routes = [{
    path: '',
    component: ComponentSideNav,
    children: [
      {path: 'component/:id', redirectTo: ':id', pathMatch: 'full'},
      {path: 'category/:id', redirectTo: '/categories/:id', pathMatch: 'full'},
      {path: '**', redirectTo: '/404'}
    ]
  }];