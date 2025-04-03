import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserStoreService } from '../services/user-store.service';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {
    constructor(private userStore: UserStoreService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {        
        this.userStore.getUser();
        return new Observable<boolean | UrlTree>(observer => {
            this.userStore.isAdmin$.subscribe(isAdmin => {
                if (isAdmin) {
                    observer.next(true);
                } else {
                    observer.next(this.router.createUrlTree(['/courses']));
                }
                observer.complete();
            });
        });
    }
}
