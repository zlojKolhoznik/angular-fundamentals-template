import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@app/shared/models/user';
import { map } from 'rxjs';

type HttpResponse<T> = {
    successful: boolean;
    result: T;
}

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private http: HttpClient) {}

    getUser() {
        const headers = {
            'Authorization': 'Bearer ' + sessionStorage.getItem('SESSION_TOKEN')
        }
        return this.http.get<HttpResponse<User>>('http://localhost:4000/users/me', { headers })
            .pipe(map(r => r.result));
    }
}
