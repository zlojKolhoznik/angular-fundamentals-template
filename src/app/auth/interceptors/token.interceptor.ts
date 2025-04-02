import { inject, Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from 'express';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = sessionStorage.getItem('SESSION_TOKEN'); // Use the same key as in SessionStorageService
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
                    sessionStorage.removeItem('SESSION_TOKEN'); // Clear the token on 401 error
                    const router = inject(Router);
                    router.navigate(['/login']);
                }
            }
        );
        return response;
    }
}
