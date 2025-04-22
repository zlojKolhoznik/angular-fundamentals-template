import { createSelector } from "@ngrx/store";
import { CoursesState } from "./courses.reducer";

// Add your code here
export const isAllCoursesLoading = (state: CoursesState) => state.isAllCoursesLoading;
export const isAllCoursesLoadingSelector = createSelector(
    isAllCoursesLoading,
    (isLoading) => isLoading
);

export const isSearchingState = (state: CoursesState) => state.isSearchState;
export const isSearchingStateSelector = createSelector(
    isSearchingState,
    (isSearching) => isSearching
);

export const isSingleCourseLoading = (state: CoursesState) => state.isSingleCourseLoading;
export const isSingleCourseLoadingSelector = createSelector(
    isSingleCourseLoading,
    (isLoading) => isLoading
);

export const courses = (state: CoursesState) => state.allCourses;
export const getCourses = createSelector(
    courses,
    (courses) => courses
);

export const getAllCourses = createSelector(
    courses,
    (courses) => courses
);

export const course = (state: CoursesState) => state.course;
export const getCourse = createSelector(
    course,
    (course) => course
);

export const errorMessage = (state: CoursesState) => state.errorMessage;
export const getErrorMessage = createSelector(
    errorMessage,
    (errorMessage) => errorMessage
);