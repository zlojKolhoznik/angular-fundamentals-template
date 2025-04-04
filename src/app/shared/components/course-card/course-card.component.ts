import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '@app/shared/models/course';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent {
  @Input() course: any;
  @Input() editable: boolean = false;
  @Output() clickOnShow: EventEmitter<Course> = new EventEmitter<Course>();
  @Output() clickOnEdit: EventEmitter<Course> = new EventEmitter<Course>();
  @Output() clickOnDelete: EventEmitter<Course> = new EventEmitter<Course>();

  public emitCourse(emitter: EventEmitter<Course>) {
    emitter.emit(this.course);
  }
}
