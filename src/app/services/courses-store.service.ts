import { Injectable } from '@angular/core';
import { CoursesService } from './courses.service';
import { BehaviorSubject } from 'rxjs';
import { Course, CourseCreation } from '@app/shared/models/course';
import { Author } from '@app/shared/models/author';

@Injectable({
    providedIn: 'root'
})
export class CoursesStoreService {
    private isLoading$$ = new BehaviorSubject<boolean>(false);
    private courses$$ = new BehaviorSubject<Course[]>([]);
    private authors$$ = new BehaviorSubject<Author[]>([]);
    public isLoading$ = this.isLoading$$.asObservable();
    public courses$ = this.courses$$.asObservable();
    public authors$ = this.authors$$.asObservable();

    constructor(private service: CoursesService) { }

    getAll(){
        this.isLoading$$.next(true);
        this.service.getAll().subscribe(result => {
            this.courses$$.next(result);
            this.isLoading$$.next(false);
        },
        error => {
            console.error('Error fetching courses:', error);
            this.courses$$.next([]);
            this.isLoading$$.next(false);
        });
    }

    createCourse(course: CourseCreation) {
        this.isLoading$$.next(true);
        this.service.createCourse(course).subscribe(result => {
            const currentCourses = this.courses$$.getValue();
            this.courses$$.next([...currentCourses, result]);
            this.isLoading$$.next(false);
        },
        error => {
            console.error('Error creating course:', error);
            this.isLoading$$.next(false);
        });
    }

    getCourse(id: string) {
        this.isLoading$$.next(true);
        this.service.getCourse(id).subscribe(result => {
            this.courses$$.next([result]);
            this.isLoading$$.next(false);
        },
        error => {
            console.error('Error fetching course:', error);
            this.isLoading$$.next(false);
        });
    }

    editCourse(id: string, course: CourseCreation) {
        this.isLoading$$.next(true);
        this.service.editCourse(id, course).subscribe(result => {
            const currentCourses = this.courses$$.getValue();
            const updatedCourses = currentCourses.map(c => c.id === id ? result : c);
            this.courses$$.next(updatedCourses);
            this.isLoading$$.next(false);
        },
        error => {
            console.error('Error editing course:', error);
            this.isLoading$$.next(false);
        });
    }

    deleteCourse(id: string) {
        this.isLoading$$.next(true);
        this.service.deleteCourse(id).subscribe(() => {
            const currentCourses = this.courses$$.getValue();
            const updatedCourses = currentCourses.filter(c => c.id !== id);
            this.courses$$.next(updatedCourses);
            this.isLoading$$.next(false);
        },
        error => {
            console.error('Error deleting course:', error);
            this.isLoading$$.next(false);
        });
    }

    filterCourses(value: string) {
        this.isLoading$$.next(true);
        this.service.filterCourses(value).subscribe(result => {
            this.courses$$.next(result);
            this.isLoading$$.next(false);
        },
        error => {
            console.error('Error filtering courses:', error);
            this.isLoading$$.next(false);
        });
    }

    getAllAuthors() {
        this.isLoading$$.next(true);
        this.service.getAllAuthors().subscribe(result => {
            this.authors$$.next(result);
            this.isLoading$$.next(false);
        },
        error => {
            console.error('Error fetching authors:', error);
            this.isLoading$$.next(false);
        });
    }

    createAuthor(name: string) {
        this.isLoading$$.next(true);
        this.service.createAuthor(name).subscribe(result => {
            const currentAuthors = this.authors$$.getValue();
            this.authors$$.next([...currentAuthors, result]);
            this.isLoading$$.next(false);
        },
        error => {
            console.error('Error creating author:', error);
            this.isLoading$$.next(false);
        });
    }

    getAuthorById(id: string) {
        this.isLoading$$.next(true);
        this.service.getAuthorById(id).subscribe(result => {
            this.authors$$.next([result]);
            this.isLoading$$.next(false);
        },
        error => {
            console.error('Error fetching author:', error);
            this.isLoading$$.next(false);
        });
    }
}
