import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, catchError, map, Observable } from 'rxjs';
import { BaseService } from './baseService';
import { environment } from '../../environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService extends BaseService implements OnDestroy {

    public readonly LOCALSTORAGE_IS_LOGIN: string = 'user_signed_in_app';
    
    private _authSub$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

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

    public register(model: RegisterModel): Observable<void> {

        return new Observable((s) => {
            this.post(environment.identityUrl + "/api/Account/Register",
                {
                    "twoFactorEnabled": model.twoFactorEnabled,
                    "role": model.role,
                    "phoneNumber": model.phoneNumber,
                    "firstname": model.firstname,
                    "lastname": model.lastname,
                    "username": model.username,
                    "email": model.email,
                    "password": model.password
                },
                { token: "" }).subscribe({
                    next: (res: any) => {
                        if (res.isSuccessful = true) {
                            s.next();
                        }
                        else {
                            s.error(res)
                        }
                    },
                    error: (res: any) => {
                        s.error(res)
                    }
                });
        })
    }

    public login(username: string, password: string): Observable<void> {
        if (username.trim() == "" || password.trim() == "") {
            localStorage.setItem(this.LOCALSTORAGE_IS_LOGIN, 'false');
            return new Observable((s) => {
                s.error(this._authSub$.next(false))
            });
        }

        return new Observable((s) => {
            this.post(environment.identityUrl + "/api/Account/Login",
                {
                    "email": username,
                    "password": password
                },
                { token: "" })
                .subscribe(
                    {
                        next: (res: any) => {
                            if (res.isSuccessful = true) {
                                s.next(this._authSub$.next(true));
                                s.next(res.token);
                            }
                            else {
                                s.error(res)
                            }
                        },
                        error: (res: any) => {
                            s.error(res)
                        }
                    });
        })
    }

    public logout(redirect: string): Observable<void> {
        localStorage.clear();
        return new Observable((s) => {
            this.get(environment.identityUrl + "/api/Account/Logout", { token: "" }).subscribe({
                next: () => {
                    this._authSub$.next(false);
                    this._router.navigateByUrl(redirect);
                },
                error: (res: any) => {
                    console.log(res.error.error)
                }
            });

        })
    }
}

interface RegisterModel {
    firstname: string,
    lastname: string,
    username: string,
    password: string,
    phoneNumber: string,
    email: string,
    role: string,
    twoFactorEnabled: boolean
}