import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CoursesState } from './courses.reducer';
import * as fromCoursesSelectors from './courses.selectors';
import * as fromCoursesActions from './courses.actions';
import { CourseCreation } from '@app/shared/models/course';

@Injectable({
    providedIn: 'root'
})
export class CoursesStateFacade {
    constructor(private store: Store<CoursesState>) { }

    isAllCoursesLoading$ = this.store.select(fromCoursesSelectors.isAllCoursesLoadingSelector);
    isSingleCourseLoading$ = this.store.select(fromCoursesSelectors.isSingleCourseLoadingSelector);
    isSearchingState$ = this.store.select(fromCoursesSelectors.isSearchingStateSelector);
    courses$ = this.store.select(fromCoursesSelectors.getCourses);
    allCourses$ = this.store.select(fromCoursesSelectors.getAllCourses);
    course$ = this.store.select(fromCoursesSelectors.getCourse);
    errorMessage$ = this.store.select(fromCoursesSelectors.getErrorMessage);

    getAllCourses() {
        this.store.dispatch(fromCoursesActions.requestAllCourses());
    }

    getSingleCourse(id: string) {
        this.store.dispatch(fromCoursesActions.requestSingleCourse({ id }));
    }

    getFilteredCourses(searchValue: string) {
        this.store.dispatch(fromCoursesActions.requestFilteredCourses({ title: searchValue }));
    }

    editCourse(body: CourseCreation, id: string) {
        this.store.dispatch(fromCoursesActions.requestEditCourse({ course: body, id }));
    }

    createCourse(body: CourseCreation) {
        this.store.dispatch(fromCoursesActions.requestCreateCourse({ course: body }));
    }

    deleteCourse(id: string) {
        this.store.dispatch(fromCoursesActions.requestDeleteCourse({ id }));
    }
}
