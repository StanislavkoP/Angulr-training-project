import {Component, OnInit, OnDestroy} from '@angular/core';
import {DataStoreService} from '../shared/data-store.service';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(
    private dataStoreService: DataStoreService,
    private authService: AuthService
  ) {}

  isAuth = false;

  ngOnInit(): void {
    this.authService.user.subscribe((user) => {
      this.isAuth = !!user;
    });
  }

  ngOnDestroy(): void {
    this.authService.user.unsubscribe();
  }

  onSaveRecipes(): void {
    this.dataStoreService.storeRecipes();
  }
}
