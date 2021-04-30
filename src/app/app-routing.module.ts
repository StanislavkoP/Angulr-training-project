import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RecipesComponent} from './recipes/recipes.component';
import {ShoppingListComponent} from './shopping-list/shopping-list.component';
import {RecipeStartComponent} from './recipes/recipe-start/recipe-start.component';
import {RecipesDetailComponent} from './recipes/recipes-detail/recipes-detail.component';
import {RecipeEditComponent} from './recipes/recipe-edit/recipe-edit.component';
import {RecipesResolverService} from './shared/recipes-resolver.service';
import {AuthComponent} from './auth/auth.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/recipes',
    pathMatch: 'full'
  },
  {
    path: 'recipes',
    component: RecipesComponent,
    resolve: [RecipesResolverService],
    children: [
      {
        path: '',
        component: RecipeStartComponent
      },
      {
        path: 'new',
        component: RecipeEditComponent,
      },
      {
        path: ':id',
        component: RecipesDetailComponent
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
      },

    ]
  },
  {
    path: 'shopping-list',
    component: ShoppingListComponent
  },
  {
    path: 'authenticate',
    component: AuthComponent
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
})
export class AppRoutingModule {

}
