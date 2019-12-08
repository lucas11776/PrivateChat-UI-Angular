import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    intercept (request: HttpRequest<any>, next: HttpHandler) {
        return next.handle(request.clone({
            setHeaders: { 'token' : window.sessionStorage.getItem('token') ? window.sessionStorage.getItem('') : '' }
        }));
    }
}
