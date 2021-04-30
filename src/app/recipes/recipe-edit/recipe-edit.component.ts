import { Component, OnInit } from '@angular/core';
import {Recipe} from '../recipe.model';
import {ShoppingListService} from '../../shopping-list/shopping-list.service';
import {RecipeService} from '../recipe.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Ingredient} from '../../shared/ingredient.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  recipeForm: FormGroup;
  editMode = false;

  constructor(
    private shoppingListService: ShoppingListService,
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.editMode = true;
      }

      this.initForm(params.id);
    });
  }

  initForm(id: number): void {
    const recipe = this.recipeService.getRecipeByIndex(id);

    if (!id && !recipe) {
        this.recipeForm = new FormGroup({
          name: new FormControl('', Validators.required),
          imagePath: new FormControl('', Validators.required),
          description: new FormControl('', Validators.required),
          ingredients: new FormArray([])
        });

        return;
      }

    const ingredients = new FormArray([]);
    if (recipe.ingredients) {
      recipe.ingredients.forEach((ingredient) => {
        ingredients.push(new FormGroup({
          name: new FormControl(ingredient.name, Validators.required),
          amount: new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
        }));
      });
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipe.name, Validators.required),
      imagePath: new FormControl(recipe.imagePath, Validators.required),
      description: new FormControl(recipe.description, Validators.required),
      ingredients
    });
  }

  onAddIngredient(): void {
    (this.recipeForm.get('ingredients') as FormArray).push(new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    }));
  }

  onDeleteIngredient(index: number): void {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);

  }

  onCancel(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onSave(): void {
    const newRecipe = new Recipe(
      this.recipeForm.value.name,
      this.recipeForm.value.description,
      this.recipeForm.value.imagePath,
      []
    );

    this.recipeForm.value.ingredients.forEach((ingredient) => {
    newRecipe.ingredients.push(new Ingredient(ingredient.name, ingredient.amount));
  });

    if (this.editMode) {
      this.recipeService.updateRecipe(this.route.snapshot.params.id, newRecipe);
      return;
    }

    this.recipeService.addRecipe(newRecipe);
  }

}
