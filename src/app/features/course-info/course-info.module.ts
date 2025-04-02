import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseInfoComponent } from './course-info.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: CourseInfoComponent,
  }
];

@NgModule({
  declarations: [CourseInfoComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class CourseInfoModule { }
