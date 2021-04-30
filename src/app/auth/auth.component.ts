import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthResponseData, AuthService} from './auth.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode = false;

  isLoading = false;

  error = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSwitchMode(): void{
    this.isLoginMode = !this.isLoginMode;
  }

  toggleLoading(): void {
    this.isLoading = !this.isLoading;
  }

  onSubmit(form: NgForm): void {
    this.error = '';
    this.toggleLoading();

    let authObserver: Observable<AuthResponseData>;

    if (this.isLoginMode) {
      authObserver = this.authService.login(form.value.email, form.value.password);
    } else {
      authObserver = this.authService.signUp(form.value.email, form.value.password);
    }

    authObserver
      .subscribe(() => {
        this.toggleLoading();
      },
        (error) => {
          this.toggleLoading();
          this.error = error;
        });


  }
}
