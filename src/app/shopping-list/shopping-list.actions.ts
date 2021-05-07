import { Action } from '@ngrx/store';
import {Ingredient} from '../shared/ingredient.model';

export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
export const UPDATE_INGREDIENT = 'UPDATE_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const SET_EDITING_INGREDIENT = 'SET_EDITING_INGREDIENT';

export class AddIngredients implements Action {
  readonly type = ADD_INGREDIENTS;

  constructor(public payload: Ingredient[]) {}
}

export class UpdateIngredient implements Action {
  readonly type = UPDATE_INGREDIENT;

  constructor(public payload: {
    index: number,
    ingredient: Ingredient
  }) {}
}

export class DeleteIngredient implements Action {
  readonly type = DELETE_INGREDIENT;

  constructor(public payload: number) {}
}

export class SetEditingIngredient implements Action {
  readonly type = SET_EDITING_INGREDIENT;

  constructor(public payload: number) {}
}


export type ShoppingListActions = AddIngredients | UpdateIngredient | DeleteIngredient | SetEditingIngredient;
