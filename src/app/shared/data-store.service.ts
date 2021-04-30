import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {RecipeService} from '../recipes/recipe.service';
import {exhaustMap, map, take, tap} from 'rxjs/operators';
import {Recipe} from '../recipes/recipe.model';
import {Observable} from 'rxjs';
import {AuthService} from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class DataStoreService {

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService,
  ) {}

  getRecipes(): Observable<Recipe[]> {
    return this.authService.user
      .pipe(
        take(1),
        exhaustMap(() => {
          return this.http.get<Recipe[]>('https://angular-test-project-e7777-default-rtdb.europe-west1.firebasedatabase.app/recipes.json');
        }),
        map(response => {
          return response.map(recipe => ({
            ...recipe,
            ingredients: recipe?.ingredients ?? []
          }));
        }),
        tap((recipes) => {
          this.recipeService.setRecipes(recipes);
        })
      );
  }

  storeRecipes(): void {
    const recipes = this.recipeService.getRecipes();
    this.http.put<Recipe[]>(
      'https://angular-test-project-e7777-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
      recipes
    ).subscribe((response) => {});
  }

}
