import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RecipiesComponent } from './recipies/recipies.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const appRoutes: Routes = [
  { path: 'recipies', component: RecipiesComponent },
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: '',
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
