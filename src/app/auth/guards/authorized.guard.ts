import { inject, Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthorizedGuard implements CanLoad {
    constructor(private authService: AuthService) { }
    canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const isAuthorized = this.authService.isAuthorised;
        if (!isAuthorized) {
            const router = inject(Router);
            router.navigate([this.authService.getLoginUrl()]);
        }
        return true;
    }
}
