import {Ingredient} from '../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

export interface IShoppingListState {
  ingredients: Ingredient[];
  editingIngredientIndex: null | number;
}

const initialState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatos', 1)
  ],
  editingIngredientIndex: null,
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions): IShoppingListState {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };

    case ShoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((_, idx) => idx !== action.payload)
      };

    case ShoppingListActions.UPDATE_INGREDIENT:
      const ingredient = state.ingredients[action.payload.index];
      const updateIngredient = {
        ...ingredient,
        ...action.payload.ingredient
      };
      const updatedList = [...state.ingredients];
      updatedList[action.payload.index] = updateIngredient;

      return {
        ...state,
        ingredients: updatedList
      };

    case ShoppingListActions.SET_EDITING_INGREDIENT:
      return {
        ...state,
        editingIngredientIndex: action.payload
      };


    default: return state;
  }
}
