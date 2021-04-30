import {Component, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {ShoppingListService} from '../../shopping-list/shopping-list.service';
import {ActivatedRoute, Router} from '@angular/router';
import {RecipeService} from '../recipe.service';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css'],
  providers: [ShoppingListService]
})
export class RecipesDetailComponent implements OnInit {
  recipe: Recipe = null;

  constructor(
    private shoppingListService: ShoppingListService,
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.recipe = this.recipeService.getRecipeByIndex(params.id);
    });
  }

  onAddIngredients(e: Event): void {
    e.preventDefault();
    this.shoppingListService.addIngredients(this.recipe.ingredients);
  }

  onEditRecipe(event: Event): void {
    event.preventDefault();
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

}
