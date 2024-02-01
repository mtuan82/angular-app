import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, catchError, from, map, Observable, pipe, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService implements OnDestroy {

    public readonly LOCALSTORAGE_IS_LOGIN: string = 'user_signed_in_app';
    private _authSub$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    public get isAuthenticated(): Observable<boolean> {
        if (localStorage.getItem(this.LOCALSTORAGE_IS_LOGIN) == 'true') {
            this._authSub$.next(true);
        }
        return this._authSub$.asObservable();
    }

    constructor(private _router: Router) {

    }

    public ngOnDestroy(): void {
        this._authSub$.next(false);
        this._authSub$.complete();
    }

    public login(username: string, password: string): Observable<void> {
        if (username.trim() == "" || password.trim() == "") {
            localStorage.setItem(this.LOCALSTORAGE_IS_LOGIN, 'false');
            return new Observable((s) => {
                s.error(this._authSub$.next(false)),
                s.error()
            });
        }

        return new Observable((s) => {
            s.next(this._authSub$.next(true)),
            s.next()
        })
    }

    public logout(redirect: string): Observable<void> {
        localStorage.removeItem(this.LOCALSTORAGE_IS_LOGIN);
        return new Observable((s) => {
            this._authSub$.next(false),
            this._router.navigateByUrl(redirect)
        })
    }
}

