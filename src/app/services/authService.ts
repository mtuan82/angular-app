import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, catchError, from, map, Observable, pipe, tap } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class AuthService implements OnDestroy {

    public readonly LOCALSTORAGE_IS_LOGIN: string = 'user_signed_in_app';
    private _authSub$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    //private readonly identityUrl:string = "http://localhost:6060";
    private readonly identityUrl: string = "https://localhost:7196";

    constructor(private _router: Router, private http: HttpClient) { }

    public get isAuthenticated(): Observable<boolean> {
        if (localStorage.getItem(this.LOCALSTORAGE_IS_LOGIN) == 'true') {
            this._authSub$.next(true);
        }
        return this._authSub$.asObservable();
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
            this.http.post(this.identityUrl + "/api/Account/Login", {
                "email": username,
                "password": password
            }).subscribe({
                next: (res: any) => {
                    if (res.isSuccessful = true) {
                        s.next(res.token);
                        s.next(this._authSub$.next(true));
                    }
                    else {
                        s.error(res.error),
                        s.error()
                    }
                },
                error: (res: any) => {
                    s.error(res.error),
                    s.error()
                }
            });
        })
    }

    public logout(redirect: string): Observable<void> {
        localStorage.removeItem(this.LOCALSTORAGE_IS_LOGIN);

        this.http.get(this.identityUrl + "/api/Account/Logout").subscribe({
            next: () => console.log("next"),
            error: (res: any) =>
            {
                console.log(res.error.error)
            },
            complete: () => console.log("complete")
        });

        return new Observable((s) => {
            this._authSub$.next(false),
                this._router.navigateByUrl(redirect)
        })
    }
}

