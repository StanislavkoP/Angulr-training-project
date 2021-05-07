import {ActionReducerMap} from '@ngrx/store';
import * as shoppingList from '../shopping-list/shopping-list.reducer';
import * as auth from '../auth/store/auth.reducer';

export interface IAppState {
  shoppingList: shoppingList.IShoppingListState;
  auth: auth.IAuthState;
}

export const appReducer: ActionReducerMap<IAppState> = {
  shoppingList: shoppingList.shoppingListReducer,
  auth: auth.authReducer
};
