import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@app/auth/services/auth.service';
import { User } from '@app/shared/models/user';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent {
  constructor(private authService: AuthService) { }

  registrationForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(6)]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', Validators.required),
  });
  // Use the names `name`, `email`, `password` for the form controls.

  register() {
    if (this.registrationForm.valid) {
      const user: User = {
        name: this.registrationForm.value.name!,
        email: this.registrationForm.value.email!,
        password: this.registrationForm.value.password!
      };
      this.authService.register(user).subscribe((response) => {
        if (response) {
          console.log('Registration successful');
          this.authService.login(user);
          window.location.pathname = '/courses';
        } else {
          console.log('Registration failed');
        }
      });

    } else {
      console.log('Form is invalid');
    }
  }
}
