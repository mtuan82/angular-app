import {Component, EventEmitter, Output, OnInit } from '@angular/core';
import { AuthService } from '../../services/authService';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';

@Component({
  selector: 'component-page-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss'],
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, NgIf]
})
export class ComponentPageHeader implements OnInit {
  isLogin: boolean = false;

  constructor(private router: Router, private auth: AuthService) {}

  @Output() toggleSidenav = new EventEmitter<void>();

  public ngOnInit(): void {
    this.auth.isAuthenticated.subscribe((isAuthenticated: boolean) => {
      this.isLogin = isAuthenticated;
      console.log("isLogin " + this.isLogin)
    });
  }

  Home(): void {
    this.router.navigateByUrl("home")
  }

  Login(): void {
    this.router.navigateByUrl("login")
  }

  Register(): void {
    this.router.navigateByUrl("register")
  }

  Logout(): void {  
    this.auth.logout("home").subscribe();
  }
}