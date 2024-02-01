import {Component, EventEmitter, Output} from '@angular/core';
import {Title} from '@angular/platform-browser';
import { AuthService } from '../../../services/authService';
import { Router } from '@angular/router';

@Component({
  selector: 'component-page-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss'],
})
export class ComponentPageHeader {
  constructor(public _pageTitle: Title,private router: Router, private auth: AuthService) {}

  @Output() toggleSidenav = new EventEmitter<void>();

  getAppTitle():string {
    return this._pageTitle.getTitle();
  }

  set appTitle(title: string) {
    this._pageTitle.setTitle(title);
  }

  Logout(): void {  
    this.auth.logout("home").subscribe();
  }
}