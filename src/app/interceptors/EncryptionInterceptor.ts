import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { EncryptionService } from '../services/EncryptionService';
import { Observable } from 'rxjs';
import { environment } from '../../environment';

@Injectable()
export class EncryptionInterceptor implements HttpInterceptor {
    constructor(private encryptionService: EncryptionService,) { }
    // If you want to some exclude api call from Encryption then add here like that.
    // environment.basUrl is your API URL
    ExcludeURLList = [
        environment.baseUrl + "/api/Common"
    ];
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let exludeFound = this.ExcludeURLList.filter(element => {
            return req.url.includes(element)
        });
        // We have Encrypt the GET and POST call before pass payload to API
        if (!(exludeFound && exludeFound.length > 0)) {
            if (req.method == "GET" || req.method == "DELETE") {
                if (req.url.indexOf("?") > 0) {
                    let encriptURL = req.url.substring(0, req.url.indexOf("?") + 1) + this.encryptionService.encryptUsingAES256(req.url.substring(req.url.indexOf("?") + 1, req.url.length));
                    const cloneReq = req.clone({
                        url: encriptURL
                    });
                    return next.handle(cloneReq);
                }
                return next.handle(req);
            } else if (req.method == "POST" || req.method == "PUT") {
                if (req.body || req.body.length > 0) {
                    if (req.url.indexOf("?") > 0) {
                        let encriptURL = req.url.substring(0, req.url.indexOf("?") + 1) + this.encryptionService.encryptUsingAES256(req.url.substring(req.url.indexOf("?") + 1, req.url.length));
                        const cloneReq = req.clone({
                            body: this.encryptionService.encryptUsingAES256(JSON.stringify(req.body)),
                            url: encriptURL
                        });
                        return next.handle(cloneReq);
                    }

                    const cloneReq = req.clone({
                        body: this.encryptionService.encryptUsingAES256(JSON.stringify(req.body)),
                    });
                    return next.handle(cloneReq);
                }
                let data = req.body as FormData;
                return next.handle(req);
            }
        }
        return next.handle(req);
    }
}