import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, IAuthResponseData } from './auth.service';

enum AuthAction {
  LOGIN = 'login',
  SIGNUP = 'signup'
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  errorMessage: string;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.isLoading = true;
    const { email, password } = form.value;
    const authAction = this.isLoginMode ? AuthAction.LOGIN : AuthAction.SIGNUP;
    const authObs: Observable<IAuthResponseData> = this.authService[authAction](email, password);

    authObs.subscribe(
      (resData) => {
        this.isLoading = false;
        this.router.navigate(['/recipies']);
      },
      (errorMessage) => {
        this.errorMessage = errorMessage;
        this.isLoading = false;
      }
    );

    form.reset();
  }
}
