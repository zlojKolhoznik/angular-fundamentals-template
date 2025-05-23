import { RouterModule, Routes } from '@angular/router';
import { AuthorizedGuard } from './auth/guards/authorized.guard';
import { NotAuthorizedGuard } from './auth/guards/not-authorized.guard';
import { AdminGuard } from './user/guards/admin.guard';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    {
        path: 'login',
        loadChildren: () => import('./shared/components/login-form/login-page-module.module').then(m => m.LoginPageModuleModule),
        canActivate: [NotAuthorizedGuard]
    },
    {
        path: 'registration',
        loadChildren: () => import('./shared/components/registration-form/registration-page.module').then(m => m.RegistrationPageModule),
        canActivate: [NotAuthorizedGuard]
    },
    {
        path: 'courses',
        loadChildren: () => import('./features/courses/courses.module').then(m => m.CoursesModule),
        canLoad: [AuthorizedGuard]
    },
    {
        path: 'courses/add',
        loadChildren: () => import('./shared/components/course-form/course-form.module').then(m => m.CourseFormModule),
        canLoad: [AuthorizedGuard],
        canActivate: [AdminGuard]
    },
    {
        path: 'courses/:id',
        loadChildren: () => import('./features/course-info/course-info.module').then(m => m.CourseInfoModule),
        canLoad: [AuthorizedGuard]
    },
    {
        path: 'courses/edit/:id',
        loadChildren: () => import('./shared/components/course-form/course-form.module').then(m => m.CourseFormModule),
        canLoad: [AuthorizedGuard],
        canActivate: [AdminGuard]
    },
    {
        path: '**',
        redirectTo: '/courses',
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' })],
    exports: [RouterModule],
    providers: [AuthorizedGuard, NotAuthorizedGuard, AdminGuard],
})
export class AppRoutingModule { }
