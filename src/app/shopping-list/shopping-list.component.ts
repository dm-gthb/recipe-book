import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { IAppState } from './store/shopping-list.reducer';
import * as ShoppingListActions from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
})
export class ShoppingListComponent implements OnInit {

  ingredients: Observable<{ ingredients: Ingredient[] }>;

  constructor(private store: Store<IAppState>) {}

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList');
  }

  onIngredientSelect(index: number) {
    this.store.dispatch(new ShoppingListActions.StartEdit(index))
  }

}
