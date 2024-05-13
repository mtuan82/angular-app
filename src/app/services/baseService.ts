import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BaseService {


    public readonly LOCALSTORAGE_TOKEN: string = 'token';

    constructor(public _router: Router, private http: HttpClient) { }

    public post(url: string, body: any, header: HeaderConfig): Observable<any> {
        const headers = { 'Authorization': 'Bearer ' + header.token, 'content-type': 'application/json' };
        return new Observable((s) => {
            this.http.post(url, body, { headers, observe: "response" }).subscribe({
                next: (res: any) => {
                    if (res.body.isSuccessful) {
                        s.next(res.body);
                    }
                    else {
                        s.error(res.body);
                    }
                },
                error: (res: any) => {
                    if (res.status === 403 || res.status === 401) {
                        localStorage.clear();
                        this._router.navigateByUrl('/login');
                    }
                    else
                    {
                        s.error(res.error);
                    }
                }
            });
        });
    }

    public get(url: string, header: HeaderConfig): Observable<any> {
        const headers = { 'Authorization': 'Bearer ' + header.token };
        return new Observable((s) => {
            this.http.get(url, { headers, observe: "response" }).subscribe({
                next: (res: any) => {
                    if (res.body.isSuccessful) {
                        s.next(res.body);
                    }
                    else {
                        s.error(res.body);
                    }
                },
                error: (res: any) => {
                    if (res.status === 403 || res.status === 401) {
                        localStorage.clear();
                        this._router.navigateByUrl('/login')
                    }
                    else
                    {
                        s.error(res.error);
                    }
                }
            });
        });
    }
}

interface HeaderConfig {
    token: string
}
