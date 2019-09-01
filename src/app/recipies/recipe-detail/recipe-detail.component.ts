import { Component } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import { Subscription } from 'rxjs';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { ActivatedRoute, Params } from '@angular/router';

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
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => this.recipe = this.recipeService.getRecipe(+params.id)
      )
  }

  addIngredients() {
    this.slService.addIngredients(this.recipe.ingredients);
  }
}
