import {Component, EventEmitter, Output} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'component-page-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss'],
  standalone: true,
  imports: [MatButtonModule, MatIconModule]
})
export class ComponentPageHeader {
  constructor(public _pageTitle: Title) {}

  @Output() toggleSidenav = new EventEmitter<void>();

  getAppTitle():string {
    return this._pageTitle.getTitle();
  }

  set appTitle(title: string) {
    this._pageTitle.setTitle(title);
  }
}