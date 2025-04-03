import { Injectable } from '@angular/core';
import { SessionStorageService } from './session-storage.service';
import { HttpClient } from '@angular/common/http';
import { User } from '@app/shared/models/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private isAuthorized$$ = new BehaviorSubject<boolean>(false);
    public isAuthorized$ = this.isAuthorized$$.asObservable();

    constructor(private httpClient: HttpClient, private sessionStorageService: SessionStorageService) {
                
    }

    login(user: User) {
        var request = this.httpClient.post('http://localhost:4000/login', user);
        request.subscribe((response: any) => {
            console.log(response);
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
        });
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
