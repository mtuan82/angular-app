import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LoginComponent } from './pages/login/login';
import { AuthService } from './services/authService';
import { ComponentPageHeader } from './components/header/header.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatToolbarModule, MatButtonModule, MatInputModule, 
            MatIconModule, LoginComponent, NgIf, ComponentPageHeader],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {
  isPublic: boolean = false;

  constructor(private router: Router, private auth: AuthService) { }

  public ngOnInit(): void {
    this.auth.isAuthenticated.subscribe((isAuthenticated: boolean) => {
      this.isPublic = isAuthenticated && this.router.url.includes("/feature");
      console.log("isPublic " + this.isPublic);
    });
  }
}
