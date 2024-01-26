import {Component, HostBinding, Inject, OnInit, Optional} from '@angular/core';
import {ANIMATION_MODULE_TYPE} from '@angular/platform-browser/animations';

@Component({
    selector: 'app-daskboard',
    templateUrl: './daskboard.html',
    styleUrls: ['./daskboard.scss'],
    standalone: true,
    imports: [
    //   NavigationFocus,
    //   MatButtonModule,
    //   RouterLink,
    //   MatDividerModule,
    //   MatIconModule,
    //   Carousel,
    //   NgFor,
    //   CarouselItem,
    //   MatCardModule,
    //   Support,
    //   Footer,
    ],
  })

  export class DaskBoard implements OnInit {
    @HostBinding('class.main-content') readonly mainContentClass = true;
    @HostBinding('class.animations-disabled') readonly animationsDisabled: boolean;
  
    isNextVersion = location.hostname === 'next.material.angular.io';
  
    constructor(
      @Optional() @Inject(ANIMATION_MODULE_TYPE) animationsModule?: string) {
      this.animationsDisabled = animationsModule === 'NoopAnimations';
    }
  
    ngOnInit(): void {

    }
  
    // getTopComponents(): string[] {
    //   return TOP_COMPONENTS;
    // }
  }