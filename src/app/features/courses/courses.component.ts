import { Component, OnInit } from '@angular/core';
import { CoursesService } from '@app/services/courses.service';
import { Course } from '@app/shared/models/course';
import { UserStoreService } from '@app/user/services/user-store.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  constructor(private service: CoursesService, public userStore: UserStoreService) {}

  ngOnInit(): void {
    this.service.getAll().subscribe((courses) => {
      this.courses = courses;
    });
  }

  public courses: Course[] = [];

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
