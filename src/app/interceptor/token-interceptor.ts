import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    API_BASE = '';//'http://api.uthandoprojects.co.za/';
    intercept (request: HttpRequest<any>, next: HttpHandler) {
        const TOKEN = window.sessionStorage.getItem('token') ? window.sessionStorage.getItem('token') : '';
        return next.handle(request.clone({setHeaders: { 'Auth-Token' : TOKEN }, url: this.API_BASE + request.url }));
    }
}
