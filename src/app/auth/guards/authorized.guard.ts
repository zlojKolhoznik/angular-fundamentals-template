import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthorizedGuard implements CanLoad {
    constructor(private authService: AuthService, private router: Router) { }
    canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.authService.isAuthorized$.pipe(
            map((isAuthorized) => {
                if (!isAuthorized) {
                    return this.router.createUrlTree(['/login']);
                }
                return true;
            }),
            catchError(() => {
                return of(this.router.createUrlTree(['/login']));
            })
        );
    }
}
