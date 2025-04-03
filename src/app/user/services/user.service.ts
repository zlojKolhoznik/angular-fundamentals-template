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
        return this.http.get<HttpResponse<User>>('http://localhost:4000/api/users/me')
            .pipe(map(r => r.result));
    }
}
