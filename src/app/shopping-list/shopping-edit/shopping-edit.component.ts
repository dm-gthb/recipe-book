import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ShoppingListService } from '../shopping-list.service';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
})
export class ShoppingEditComponent {
  @ViewChild('shoppingListForm', { static: false }) shoppingListForm: NgForm;

  selectedIngredientIndex: number;
  subscription: Subscription;
  isEditMode = false;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.slService.ingredientSelect
      .subscribe((selectedIngredientIndex: number) => {
        this.isEditMode = true;
        this.selectedIngredientIndex = selectedIngredientIndex;
        const selectedIngredient = this.slService.getIngredient(selectedIngredientIndex);
        this.shoppingListForm.setValue({
          name: selectedIngredient.name,
          amount: selectedIngredient.amount,
        })
      })
  }

  onOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit(form: NgForm) {
    const ingredient = form.value;
    if (this.isEditMode) {
      this.slService.updateIngredient(this.selectedIngredientIndex, ingredient);
    } else {
      this.slService.addIngredient(ingredient);
    }

    this.shoppingListForm.reset();
    this.isEditMode = false;
  }

  onDelete() {
    this.slService.deleteIngredient(this.selectedIngredientIndex);
    this.shoppingListForm.reset();
    this.isEditMode = false;
  }

  onClear() {
    this.shoppingListForm.reset();
    this.isEditMode = false;
  }
}
