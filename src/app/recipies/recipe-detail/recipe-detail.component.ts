import { Component } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
})
export class RecipeDetailComponent {
  recipe: Recipe;
  subscription: Subscription;

  constructor(
    private recipeService: RecipeService,
    private slService: ShoppingListService,
  ) { }

  ngOnInit() {
    this.subscription = this.recipeService.recipeSelected
      .subscribe((recipe: Recipe) => this.recipe = recipe);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  addIngredients(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
}
