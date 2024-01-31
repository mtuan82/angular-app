import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, catchError, from, map, Observable, pipe, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService implements OnDestroy {

    private _authSub$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public get isAuthenticated(): Observable<boolean> {
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
            return new Observable( (s) => {
                s.error(this._authSub$.next(false))
                s.error()
            });
        }

        return new Observable((s) => {
            s.next(this._authSub$.next(true)) 
            s.next()
        })       
    }

    // public logout(redirect: string): Observable<void> {
    //   return from(this._authClient.signOut()).pipe(
    //     tap( _ => (this._authSub$.next(false), this._router.navigate([redirect]))),
    //     catchError(err => {
    //       console.error(err);
    //       throw new Error('Unable to sign out');
    //     })
    //   )
    // }

    private handleSignInResponse(status: string): void {
        if (status !== 'SUCCESS') {
            throw new Error(`We cannot handle the ${status} status`);
        }
        console.log("next")
        this._authSub$.next(true)
        //this._authClient.session.setCookieAndRedirect(transaction.sessionToken);
    }
}