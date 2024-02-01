import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { filter, Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../services/authService';

@Component({
  selector: 'sidenav-component',
  templateUrl: 'sidenav.component.html',
  styleUrls: ['sidenav.component.scss'],
  standalone: false,
})

export class ComponentSideNav implements OnInit {
  isExpanded: boolean = false;
  private _destroySub$ = new Subject<void>();
  private readonly returnUrl: string;

  constructor(private _router: Router, private _route: ActivatedRoute, private auth: AuthService) { 
    this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || 'login'
    console.log("sidenav.component") 
  }

  public ngOnInit(): void {
    //if not login then navigate to login page
    this.auth.isAuthenticated.pipe(
      filter((isAuthenticated: boolean) => !isAuthenticated),
      takeUntil(this._destroySub$)
    ).subscribe(_ => this._router.navigateByUrl(this.returnUrl));
  }
}
