import { inject, Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from 'express';
import { SessionStorageService } from '../services/session-storage.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private service: SessionStorageService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.service.getToken(); // Get the token from session storage
        if (token) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }
        const response = next.handle(req);
        response.subscribe(
            (event: HttpEvent<any>) => {
                // Handle the response if needed
            },
            (error: any) => {
                if (error.status === 401) {
                    this.service.deleteToken(); // Remove the token if unauthorized
                    const router = inject(Router);
                    router.navigate(['/login']);
                }
            }
        );
        return response;
    }
}
