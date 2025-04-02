import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Author } from '@app/shared/models/author';
import { Course, CourseCreation } from '@app/shared/models/course';
import { map } from 'rxjs';

const baseUrl = 'http://localhost:3000/api/courses';
type HttpResponse<T> = {
    successful: boolean;
    result: T;
}

@Injectable({
    providedIn: 'root'
})
export class CoursesService {
    constructor(private http: HttpClient) {}

    getAll() {
        return this.http.get<HttpResponse<Course[]>>(baseUrl + '/all')
            .pipe(map(response => response.result));
    }

    createCourse(course: CourseCreation) { // replace 'any' with the required interface
        return this.http.post<HttpResponse<Course>>(baseUrl + '/add', course)
            .pipe(map(response => response.result));
    }

    editCourse(id: string, course: CourseCreation) { // replace 'any' with the required interface
        return this.http.put<HttpResponse<Course>>(baseUrl + '/id', course)
            .pipe(map(response => response.result));
    }

    getCourse(id: string) {
        return this.http.get<HttpResponse<Course>>(baseUrl + '/id')
            .pipe(map(response => response.result));
    }

    deleteCourse(id: string) {
        return this.http.delete<HttpResponse<string>>(baseUrl + '/id')
            .pipe(map(response => response.result));
    }

    filterCourses(value: string) {
        return this.http.get<HttpResponse<Course[]>>(baseUrl + '/filter', { params: { value } })
            .pipe(map(response => response.result));
    }

    getAllAuthors() {
        return this.http.get<HttpResponse<Author[]>>(baseUrl + '/authors/all')
            .pipe(map(response => response.result));
    }

    createAuthor(name: string) {
        return this.http.post<HttpResponse<Author>>(baseUrl + '/authors/add', { name })
            .pipe(map(response => response.result));
    }

    getAuthorById(id: string) {
        return this.http.get<HttpResponse<Author>>(baseUrl + '/authors/' + id)
            .pipe(map(response => response.result));
    }
}
