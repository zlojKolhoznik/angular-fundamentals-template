import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '@app/auth/services/auth.service';
import { User } from '@app/shared/models/user';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  @ViewChild("loginForm") public loginForm!: NgForm;
  public email: string = '';
  public password: string = '';

  constructor(private authService: AuthService) {}

  public login() {
    if (this.loginForm.valid) {
      const user: User = {email: this.email, password: this.password, name: null};
      this.authService.login(user);
      this.authService.isAuthorized$.subscribe((isAuthorized) => {
        if (isAuthorized) {
          window.location.pathname = '/courses';
        }
      });
    }
  }
}
