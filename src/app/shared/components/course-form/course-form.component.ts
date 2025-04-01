import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder, FormGroup,
  Validators
} from '@angular/forms';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent {
  constructor(public fb: FormBuilder, public library: FaIconLibrary) {
    library.addIconPacks(fas);
    this.courseForm = this.createForm();
  }
  courseForm!: FormGroup;
  initialAuthors: string[] = [];
  // Use the names `title`, `description`, `author`, 'authors' (for authors list), `duration` for the form controls.

  private createForm(): FormGroup {
    return this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(2)]],
      author: ['', [Validators.required, Validators.minLength(2), Validators.pattern(/^[a-zA-Z0-9 ]+$/)]],
      authors: this.fb.array(['']),
      duration: [0, [Validators.required, Validators.min(0)]],
    });
  }

  removeAuthorFromCourse(author: string) {
    const index = this.initialAuthors.indexOf(author);
    if (index !== -1) {
      let courseAuthors = this.courseForm.get('authors') as FormArray;
      courseAuthors.removeAt(index);
    }

    this.initialAuthors.push(author);
  }

  addAuthorToCourse(author: string) {
    const index = this.initialAuthors.indexOf(author);
    if (index !== -1) {
      let courseAuthors = this.courseForm.get('authors') as FormArray;
      courseAuthors.push(this.fb.control(author));
      this.initialAuthors.splice(index, 1);
    }
  }

  removeAuthorFromInitialAuthors(author: string) {
    const index = this.initialAuthors.indexOf(author);
    if (index !== -1) {
      this.initialAuthors.splice(index, 1);
    }
  }
}
