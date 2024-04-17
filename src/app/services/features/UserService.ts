import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { BaseService } from '../baseService';

@Injectable()
export class UserService extends BaseService {
    public testexpiration(): Observable<void> {

        return new Observable((s) => {
            this.get("/api/Account/testexpiration", { token: localStorage.getItem(this.LOCALSTORAGE_TOKEN)??"".toString() }).subscribe({
                next: () => {
                    console.log("NO EXPIRE");
                },
                error: (res: any) => {
                    console.log(res.error.error);
                }
            });

        });
    }
}