import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {IAppState} from '../../store';
import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';
import * as ShoppingListActions from '../shopping-list.actions';

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

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<IAppState>
  ) { }

  ngOnInit(): void {
    this.editingIngredientListener = this.store.select('shoppingList').subscribe((data) => {
      console.log(data);
      const editingIngredientIdx = data.editingIngredientIndex;
      if (editingIngredientIdx < 0) { return; }

      const ingredients = data.ingredients;

      const ingredient = ingredients.find((_, idx) => idx === editingIngredientIdx);
      if (!ingredient) { return; }

      this.ingredientForm.setValue({
        name: ingredient.name,
        amount: ingredient.amount,
      });
      this.isEditingIngredient = true;
    });
  }

  ngOnDestroy(): void {
    this.store.dispatch(new ShoppingListActions.SetEditingIngredient(null));
    this.editingIngredientListener.unsubscribe();
  }

  onAddIngredient(form: NgForm): void {
    const name = form.value.name;
    const amount = form.value.amount;
    const ingredient = new Ingredient(name, amount);

    this.store.dispatch(new ShoppingListActions.AddIngredients([ingredient]));
  }

  onUpdateIngredient(): void {
    const name = this.ingredientForm.value.name;
    const amount = this.ingredientForm.value.amount;
    const ingredient = new Ingredient(name, amount);

    this.store.dispatch(new ShoppingListActions.UpdateIngredient({ index: this.editingIngredientIndex, ingredient }));
  }

  onDeleteIngredient(): void {
    this.store.dispatch(new ShoppingListActions.DeleteIngredient(this.editingIngredientIndex));
    this.onClearForm();
  }

  onClearForm(): void {
    this.editingIngredientIndex = null;
    this.ingredientForm.resetForm();
    this.isEditingIngredient = false;
  }
}
