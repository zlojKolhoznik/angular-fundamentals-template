import { Injectable } from '@angular/core';
import { User } from '@app/shared/models/user';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
    providedIn: 'root'
})
export class UserStoreService {

    private name$$ = new BehaviorSubject<string>('');
    private isAdmin$$ = new BehaviorSubject<boolean>(false);
    public name$ = this.name$$.asObservable();
    public isAdmin$ = this.isAdmin$$.asObservable();

    constructor(private service: UserService) { }

    getUser() {
        this.service.getUser().subscribe(u => {
            this.name$$.next(u.name);
            this.isAdmin$$.next(u.role !== undefined && u.role === 'admin');
        }, e => {
            console.error(e);
            this.name$$.next('');
            this.isAdmin$$.next(false);
        });
    }

    get isAdmin() {
        return this.isAdmin$$.getValue();
    }

    set isAdmin(value: boolean) {
        this.isAdmin$$.next(value);
    }
}
