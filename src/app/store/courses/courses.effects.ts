import { Injectable } from '@angular/core';
import { CoursesService } from '@app/services/courses.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import * as CoursesActions from './courses.actions';
import { Router } from '@angular/router';

@Injectable()
export class CoursesEffects {
    constructor(private actions$: Actions, private courses: CoursesService, private router: Router) { }

    // Add your code here
    getAll$ = createEffect(() => this.actions$.pipe(
        ofType(CoursesActions.requestAllCourses),
        mergeMap(() => this.courses.getAll().pipe(
            map((courses) => CoursesActions.requestAllCoursesSuccess({ courses })),
            catchError((error) => of(CoursesActions.requestAllCoursesFail({ error })))
        ))
    ));

    filteredCourses$ = createEffect(() => this.actions$.pipe(
        ofType(CoursesActions.requestFilteredCourses),
        mergeMap(({ title }) => this.courses.filterCourses(title).pipe(
            map((courses) => CoursesActions.requestFilteredCoursesSuccess({ courses })),
            catchError((error) => of(CoursesActions.requestFilteredCoursesFail({ error })))
        ))
    ));

    getSpecificCourse$ = createEffect(() => this.actions$.pipe(
        ofType(CoursesActions.requestSingleCourse),
        mergeMap(({ id }) => this.courses.getCourse(id).pipe(
            map((course) => CoursesActions.requestSingleCourseSuccess({ course })),
            catchError((error) => of(CoursesActions.requestSingleCourseFail({ error })))
        ))
    ));

    deleteCourse$ = createEffect(() => this.actions$.pipe(
        ofType(CoursesActions.requestDeleteCourse),
        mergeMap(({ id }) => this.courses.deleteCourse(id).pipe(
            map(() => CoursesActions.requestDeleteCourseSuccess()),
            catchError((error) => of(CoursesActions.requestDeleteCourseFail({ error })))
        ))
    ));

    editCourse$ = createEffect(() => this.actions$.pipe(
        ofType(CoursesActions.requestEditCourse),
        mergeMap(({ id, course }) => this.courses.editCourse(id, course).pipe(
            map(() => CoursesActions.requestEditCourseSuccess({ course })),
            catchError((error) => of(CoursesActions.requestEditCourseFail({ error })))
        ))
    ));

    createCourse$ = createEffect(() => this.actions$.pipe(
        ofType(CoursesActions.requestCreateCourse),
        mergeMap(({ course }) => this.courses.createCourse(course).pipe(
            map((course) => CoursesActions.requestCreateCourseSuccess({ course })),
            catchError((error) => of(CoursesActions.requestCreateCourseFail({ error })))
        ))
    ));

    redirectToTheCoursesPage$ = createEffect(() => this.actions$.pipe(
        ofType(
            CoursesActions.requestCreateCourseSuccess,
            CoursesActions.requestEditCourseSuccess,
            CoursesActions.requestSingleCourseFail
        ),
        tap(() => this.router.navigate(['/courses'])
        )),
        { dispatch: false }
    );
}
