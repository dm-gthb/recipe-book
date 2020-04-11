import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as ShoppingListActions from '../store/shopping-list.actions';
import { IAppState } from '../store/shopping-list.reducer';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
})
export class ShoppingEditComponent {
  @ViewChild('shoppingListForm', { static: false }) shoppingListForm: NgForm;

  subscription: Subscription;
  isEditMode = false;
  editedIngredient: Ingredient;

  constructor(
    private store: Store<IAppState>
  ) {}

  ngOnInit() {
    this.store.select('shoppingList')
      .subscribe((stateData) => {
        if (stateData.editedIngredientIndex > -1) {
          this.isEditMode = true;
          this.editedIngredient = stateData.editedIngredient;
          this.shoppingListForm.setValue({
            name: this.editedIngredient.name,
            amount: this.editedIngredient.amount,
          })
        } else {
          this.isEditMode = false;
        }
    });
  }

  onOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onSubmit(form: NgForm) {
    const ingredient = form.value;
    if (this.isEditMode) {
      this.store.dispatch(new ShoppingListActions.UpdateIngredient(ingredient));
    } else {
      this.store.dispatch(new ShoppingListActions.AddIngredient(ingredient));
    }

    this.shoppingListForm.reset();
    this.isEditMode = false;
  }

  onDelete() {
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.shoppingListForm.reset();
    this.isEditMode = false;
  }

  onClear() {
    this.shoppingListForm.reset();
    this.isEditMode = false;
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }
}
