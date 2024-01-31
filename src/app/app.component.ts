import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LoginComponent } from './pages/login/login';
import { AuthService } from './services/authService';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatToolbarModule, MatButtonModule, MatInputModule, MatIconModule, LoginComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {
  isLogin: boolean = false;

  constructor(private router: Router, private auth: AuthService) { }

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

}
