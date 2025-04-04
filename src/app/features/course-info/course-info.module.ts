import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseInfoComponent } from './course-info.component';
import { SharedModule } from '@app/shared/shared.module';
import { CourseInfoRoutingModule } from './course-info-rouing.module';

@NgModule({
  declarations: [CourseInfoComponent],
  imports: [
    CommonModule,
    SharedModule,
    CourseInfoRoutingModule,
  ],
  exports: [],
})
export class CourseInfoModule { }
