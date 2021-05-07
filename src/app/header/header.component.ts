import {Component, OnInit, OnDestroy} from '@angular/core';
import {DataStoreService} from '../shared/data-store.service';
import {AuthService} from '../auth/auth.service';
import {Store} from "@ngrx/store";
import {IAppState} from "../store";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(
    private dataStoreService: DataStoreService,
    private authService: AuthService,
    private store: Store<IAppState>
  ) {}

  isAuth = false;

  ngOnInit(): void {
    this.store.select('auth').subscribe((state) => {
      this.isAuth = !!state.user;
    });
  }

  ngOnDestroy(): void {
    this.authService.user.unsubscribe();
  }

  onSaveRecipes(): void {
    this.dataStoreService.storeRecipes();
  }

  onLogout(e: Event): void {
    e.preventDefault();
    this.authService.logout();
  }
}
