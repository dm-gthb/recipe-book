import { Component } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
})
export class RecipeDetailComponent {
  recipe: Recipe;

  constructor(
    private recipeService: RecipeService,
    private slService: ShoppingListService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.recipe = this.recipeService.getRecipe(+params.id);
        }
      )
  }

  addIngredients() {
    this.slService.addIngredients(this.recipe.ingredients);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteRecipe(index: number) {
    this.recipeService.deleteRecipe(index);
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
