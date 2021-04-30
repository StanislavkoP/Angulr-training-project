import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('ingredientForm', { static: false }) ingredientForm: NgForm;

  editingIngredientIndex = null;
  isEditingIngredient = false;

  private editingIngredientListener: Subscription;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.editingIngredientListener = this.shoppingListService.editIngredient.subscribe((index: number) => {
      const ingredient = this.shoppingListService.getIngredientByIndex(index);
      this.ingredientForm.setValue({
        name: ingredient.name,
        amount: ingredient.amount,
      });
      this.editingIngredientIndex = index;
      this.isEditingIngredient = true;
    });
  }

  ngOnDestroy(): void {
    this.editingIngredientListener.unsubscribe();
  }

  onAddIngredient(form: NgForm): void {
    const name = form.value.name;
    const amount = form.value.amount;
    const ingredient = new Ingredient(name, amount);

    this.shoppingListService.addIngredient(ingredient);
  }

  onUpdateIngredient() {
    const name = this.ingredientForm.value.name;
    const amount = this.ingredientForm.value.amount;
    const ingredient = new Ingredient(name, amount);

    this.shoppingListService.updateIngredient(this.editingIngredientIndex, ingredient);
  }

  onDeleteIngredient(): void {
    this.shoppingListService.deleteIngredient(this.editingIngredientIndex);
    this.onClearForm();
  }

  onClearForm(): void {
    this.editingIngredientIndex = null;
    this.ingredientForm.resetForm();
    this.isEditingIngredient = false;
  }
}
