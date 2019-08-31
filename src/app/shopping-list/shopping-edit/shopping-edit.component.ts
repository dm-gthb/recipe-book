import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
})
export class ShoppingEditComponent {

  constructor(private slService: ShoppingListService) { }

  onSubmit(form: NgForm) {
    this.slService.addIngredient(form.value)
  }
}
