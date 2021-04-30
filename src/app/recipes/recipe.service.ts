import {Injectable} from '@angular/core';
import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Subject} from 'rxjs';
import {DataStoreService} from '../shared/data-store.service';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  constructor(private shoppingListService: ShoppingListService) {}

  recipes: Recipe[] = [];

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  setRecipes(recipes: Recipe[]): void {
    this.recipes = recipes;

    this.recipesChanged.next(recipes);
  }

  addIngredients(ingredients: Ingredient[]): void {
    this.shoppingListService.addIngredients(ingredients);
  }

  getRecipeByIndex(index: number): Recipe {
    return this.recipes[index];
  }

  updateRecipe(index: number, recipe: Recipe): void {
    this.recipes[index] = recipe;

    this.recipesChanged.next(this.recipes);
  }

  addRecipe(recipe: Recipe): void {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes);
  }
}
