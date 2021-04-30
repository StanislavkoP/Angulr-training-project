import {Subject} from 'rxjs';
import {Ingredient} from '../shared/ingredient.model';

export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  editIngredient = new Subject<number>();

  ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatos', 1)
  ];

  getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  getIngredientByIndex(index: number): Ingredient {
    return this.ingredients[index];
  }

  addIngredients(ingredients: Ingredient[]): void {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredient(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number): void {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  startEditIngredient(index: number): void {
    this.editIngredient.next(index);
  }

  updateIngredient(index: number, ingredient: Ingredient): void {
    this.ingredients.splice(index, 1, ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
