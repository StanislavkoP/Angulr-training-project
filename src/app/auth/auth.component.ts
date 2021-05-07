import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthResponseData, AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {IAppState} from '../store';
import * as AuthActions from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode = false;

  isLoading = false;

  error = '';

  constructor(
    private authService: AuthService,
    private store: Store<IAppState>
  ) { }

  ngOnInit(): void {
    this.store.select('auth').subscribe((authState) => {
      this.isLoading = authState.loading;
      this.error = authState.error;
    });
  }

  onSwitchMode(): void{
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm): void {
    this.error = '';
    let authObserver: Observable<AuthResponseData>;

    if (this.isLoginMode) {
      this.store.dispatch(new AuthActions.AuthLoginStart({ email: form.value.email, password: form.value.password }));
    } else {
      authObserver = this.authService.signUp(form.value.email, form.value.password);
    }
  }
}
