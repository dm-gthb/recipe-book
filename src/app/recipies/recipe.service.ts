import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  private recipies: Recipe[] = [];

  setRecipes(recipes: Recipe[]) {
    this.recipies = recipes;
    this.recipesChanged.next(this.recipies.slice());
  }

  getRecipies() {
    return this.recipies.slice();
  }

  getRecipe(index: number) {
    return this.recipies[index];
  }

  updateRecipe(updatedRecipe: Recipe, index: number) {
    this.recipies[index] = updatedRecipe;
    this.recipesChanged.next(this.recipies.slice());
  }

  addRecipe(recipe: Recipe) {
    this.recipies.push(recipe);
    this.recipesChanged.next(this.recipies.slice())
  }

  deleteRecipe(index: number) {
    this.recipies.splice(index, 1);
    this.recipesChanged.next(this.recipies.slice());
  }
}
