import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RecipiesComponent } from './recipies/recipies.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeDetailComponent } from './recipies/recipe-detail/recipe-detail.component';
import { RecipeListComponent } from './recipies/recipe-list/recipe-list.component';
import { RecipeStartComponent } from './recipies/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipies/recipe-edit/recipe-edit.component';

const appRoutes: Routes = [
  {
    path: 'recipies',
    component: RecipiesComponent,
    children: [
      {
        path: '',
        component: RecipeStartComponent
      },
      {
        path: 'new',
        component: RecipeEditComponent
      },
      {
        path: ':id',
        component: RecipeDetailComponent
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent
      },
    ]
  },
  { path: 'shopping-list', component: ShoppingListComponent },
  {
    path: '',
    redirectTo: '/recipies',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
