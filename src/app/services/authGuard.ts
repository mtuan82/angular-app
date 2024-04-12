import { Injectable } from '@angular/core';
import { Router, CanActivate, UrlTree } from '@angular/router';
import { AuthService } from './authService';
import { map, Observable } from 'rxjs';
import { isExpiredToken } from '../utils/common';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _authService: AuthService, private _router: Router) { }

  public canActivate(): Observable<boolean | UrlTree> {
    var token = localStorage.getItem(this._authService.LOCALSTORAGE_TOKEN) ?? "";
    if (token != undefined && token != "") {
      if (isExpiredToken(token)) {
        localStorage.clear();
        return this._authService.isAuthenticated.pipe(
          map((s: boolean) => this._router.parseUrl('/login'))
        );
      }
    }
    return this._authService.isAuthenticated.pipe(
      map((s: boolean) => s ? true : this._router.parseUrl('/login'))
    );
  }
}