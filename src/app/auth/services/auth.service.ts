import { Injectable } from '@angular/core';
import { SessionStorageService } from './session-storage.service';
import { HttpClient } from '@angular/common/http';
import { User } from '@app/shared/models/user';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private isAuthorized$$: BehaviorSubject<boolean>;
    public isAuthorized$: Observable<boolean>;

    constructor(private httpClient: HttpClient, private sessionStorageService: SessionStorageService) {
        this.isAuthorized$$ = new BehaviorSubject<boolean>(this.sessionStorageService.getToken() !== null);
        this.isAuthorized$ = this.isAuthorized$$.asObservable();

    }

    login(user: User) {
        var request = this.httpClient.post('http://localhost:4000/login', user);
        request.subscribe((response: any) => {
            if (response && response.result) {
                this.sessionStorageService.setToken(response.result.split(' ')[1]); // Remove 'Bearer' from the token
                this.isAuthorized$$.next(true);
            }
        });
    }

    logout() {
        var token = this.sessionStorageService.getToken();
        var request = this.httpClient.post('http://localhost:4000/logout', {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        request.subscribe((response: any) => {
            if (response && response.successful) {
                this.sessionStorageService.deleteToken();
                this.isAuthorized$$.next(false);
            }
        });
    }

    register(user: User) { // replace 'any' with the required interface
        var request = this.httpClient.post('http://localhost:4000/register', user);
        request.subscribe((response: any) => {
            if (response && response.successful) {
                this.login(user);
            }
        }, (error) => {
            console.error('Registration failed', error);
        });
        return request.pipe(map((response: any) => {
            if (response && response.successful) {
                return true;
            } else {
                return false;
            }
        }));
    }

    get isAuthorised() {
        return this.isAuthorized$$.getValue();
    }

    set isAuthorised(value: boolean) {
        this.isAuthorized$$.next(value);
    }

    getLoginUrl() {
        return '/login';
    }
}
