import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RecipiesComponent } from './recipies/recipies.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeDetailComponent } from './recipies/recipe-detail/recipe-detail.component';
import { RecipeStartComponent } from './recipies/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipies/recipe-edit/recipe-edit.component';
import { RecipesResolverService } from './recipies/recipe-resolver.service';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth-guard';

const appRoutes: Routes = [
  {
    path: 'recipies',
    component: RecipiesComponent,
    canActivate: [AuthGuard],
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
        component: RecipeDetailComponent,
        resolve: [RecipesResolverService]
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
        resolve: [RecipesResolverService]
      },
    ]
  },
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: 'auth', component: AuthComponent },
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
