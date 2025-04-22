import { Course } from '@app/shared/models/course';
import { Action, createReducer, on } from '@ngrx/store';
import * as CoursesActions from './courses.actions';

// Add your code here

export interface CoursesState {
    allCourses: Course[];
    course: Course | null;
    isAllCoursesLoading: boolean;
    isSingleCourseLoading: boolean;
    isSearchState: boolean;
    errorMessage: string | null;
}

export const initialState: CoursesState = {
    allCourses: [],
    course: null,
    isAllCoursesLoading: false,
    isSingleCourseLoading: false,
    isSearchState: false,
    errorMessage: null,
};

export const coursesReducer = createReducer(
    initialState,
    on(CoursesActions.requestAllCourses, (state) => ({
        ...state,
        isAllCoursesLoading: true,
        errorMessage: null,
    })),
    on(CoursesActions.requestAllCoursesSuccess, (state, { courses }) => ({
        ...state,
        allCourses: courses,
        isAllCoursesLoading: false,
        errorMessage: null,
    })),
    on(CoursesActions.requestAllCoursesFail, (state, { error }) => ({
        ...state,
        isAllCoursesLoading: false,
        errorMessage: error,
    })),
    on(CoursesActions.requestSingleCourse, (state) => ({
        ...state,
        isSingleCourseLoading: true,
        errorMessage: null,
    })),
    on(CoursesActions.requestSingleCourseSuccess, (state, { course }) => ({
        ...state,
        course: course,
        isSingleCourseLoading: false,
        errorMessage: null,
    })),
    on(CoursesActions.requestSingleCourseFail, (state, { error }) => ({
        ...state,
        isSingleCourseLoading: false,
        errorMessage: error,
    })),
    on(CoursesActions.requestFilteredCourses, (state) => ({
        ...state,
        isSearchState: true,
        errorMessage: null,
    })),
    on(CoursesActions.requestFilteredCoursesSuccess, (state, { courses }) => ({
        ...state,
        allCourses: courses,
        isSearchState: false,
        errorMessage: null,
    })),
    on(CoursesActions.requestFilteredCoursesFail, (state, { error }) => ({
        ...state,
        isSearchState: false,
        errorMessage: error,
    })),
    on(CoursesActions.requestDeleteCourse, (state) => ({
        ...state,
        errorMessage: null,
    })),
    on(CoursesActions.requestDeleteCourseSuccess, (state) => ({
        ...state,
        errorMessage: null,
    })),
    on(CoursesActions.requestDeleteCourseFail, (state, { error }) => ({
        ...state,
        errorMessage: error,
    })),
    on(CoursesActions.requestEditCourse, (state) => ({
        ...state,
        errorMessage: null,
    })),
    on(CoursesActions.requestEditCourseSuccess, (state, { course }) => {
        const updatedCourses = state.allCourses.map((c) => (c.id === course.id ? course : c));
        return {
            ...state,
            allCourses: updatedCourses,
            errorMessage: null,
        };
    }),
    on(CoursesActions.requestEditCourseFail, (state, { error }) => ({
        ...state,
        errorMessage: error,
    })),
    on(CoursesActions.requestCreateCourse, (state) => ({
        ...state,
        errorMessage: null,
    })),
    on(CoursesActions.requestCreateCourseSuccess, (state, { course }) => {
        const updatedCourses = [...state.allCourses, course];
        return {
            ...state,
            allCourses: updatedCourses,
            errorMessage: null,
        };
    }),
    on(CoursesActions.requestCreateCourseFail, (state, { error }) => ({
        ...state,
        errorMessage: error,
    }))
);

export const coursesFeatureKey = 'courses';

export const reducer = (state: CoursesState, action: Action): CoursesState => coursesReducer(state, action);
