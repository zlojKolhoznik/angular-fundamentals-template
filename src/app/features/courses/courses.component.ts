import { Component } from '@angular/core';
import { CoursesService } from '@app/services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent {
  constructor(private service: CoursesService) {
    this.service.getAll().subscribe((data) => {
      console.log(data); // this is for test purposes only.
    });
  }
}
