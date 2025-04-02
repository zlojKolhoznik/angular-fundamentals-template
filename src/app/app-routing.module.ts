import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '/login',
        loadChildren: () => import('./shared/components/login-form/login-page-module.module').then(m => m.LoginPageModuleModule)
    },
    {
        path: '/registration',
        loadChildren: () => import('./shared/components/registration-form/registration-page.module').then(m => m.RegistrationPageModule)
    },
    {
        path: '/courses',
        loadChildren: () => import('./features/courses/courses.module').then(m => m.CoursesModule)
    },
    {
        path: 'courses/add',
        loadChildren: () => import('./shared/components/course-form/course-form.module').then(m => m.CourseFormModule)
    },
    {
        path: 'courses/:id',
        loadChildren: () => import('./features/course-info/course-info.module').then(m => m.CourseInfoModule)
    },
    {
        path: 'courses/edit/:id',
        loadChildren: () => import('./shared/components/course-form/course-form.module').then(m => m.CourseFormModule)
    },
    {
        path: '**',
        redirectTo: '/courses',
    }
];
