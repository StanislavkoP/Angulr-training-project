import {Component, OnDestroy, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {RecipeService} from '../recipe.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css'],
})
export class RecipesListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  recipeChangeListener: Subscription;

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();

    this.recipeChangeListener = this.recipeService.recipesChanged.subscribe((recipes) => {
      this.recipes = recipes;
    });
  }

  ngOnDestroy(): void {
    this.recipeChangeListener.unsubscribe();
  }
}
