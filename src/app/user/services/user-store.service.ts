import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
    providedIn: 'root'
})
export class UserStoreService {

    private name$$ = new BehaviorSubject<string | null>('');
    private isAdmin$$ = new BehaviorSubject<boolean>(false);
    public name$ = this.name$$.asObservable();
    public isAdmin$ = this.isAdmin$$.asObservable();

    constructor(private service: UserService) {
        this.getUser();
     }

    getUser() {
        let result = this.service.getUser();
        result.subscribe(u => {
            this.name$$.next(u.name);
            this.isAdmin$$.next(u.role !== undefined && u.role === 'admin');
        }, e => {
            console.error(e);
            this.name$$.next('');
            this.isAdmin$$.next(false);
        });
        return result;
    }

    get isAdmin() {
        return this.isAdmin$$.getValue();
    }

    set isAdmin(value: boolean) {
        this.isAdmin$$.next(value);
    }
}
