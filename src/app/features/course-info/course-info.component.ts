import { Component } from '@angular/core';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent {
  // Use the names for the input `course`.
  title = '';
  description = '';
  id = '';
  creationDate: Date = new Date();
  duration = 0;
  authors: string[] = [];
}
