import { Component, OnInit } from '@angular/core';
import { Course } from '@app/shared/models/course';
import { CoursesStateFacade } from '@app/store/courses/courses.facade';
import { UserStoreService } from '@app/user/services/user-store.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  constructor(private facade: CoursesStateFacade, public userStore: UserStoreService) {}

  ngOnInit(): void {
    this.facade.getAllCourses();
  }

  public courses$ = this.facade.courses$;

  public mockDeleteCourse() {
    alert('Mock deletion!');
  }

  public editCourse(course: Course) {
    window.location.href = `/courses/edit/${course.id}`;
  }

  public showCourse(course: Course) {
    window.location.href = `/courses/${course.id}`;
  }

}
