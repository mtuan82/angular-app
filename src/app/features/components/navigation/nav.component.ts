import { animate, state, style, transition, trigger} from '@angular/animations';
import { Component, Input } from '@angular/core';
import { NgIf, AsyncPipe, NgFor} from '@angular/common';
import { Params , RouterLinkActive, RouterLink } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-component-nav',
    templateUrl: 'nav.component.html',
    styleUrls: ['nav.component.scss'],
    animations: [
      trigger('bodyExpansion', [
        state('collapsed', style({ height: '0px', display: 'none' })),
        state('expanded', style({ height: '*', display: 'block' })),
        transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4,0.0,0.2,1)')),
      ]),
    ],
    standalone: true,
    imports: [
      NgIf,
      MatListModule,
      NgFor,
      RouterLinkActive,
      RouterLink,
      AsyncPipe,
    ],
  })
  export class ComponentNav {
    @Input() params: Observable<Params> | undefined;
    currentItemId: string | undefined;
  
    constructor() {} //public docItems: DocumentationItems
  }