import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Recipe } from './recipe.model';
import { DataStorageService } from '../shared/data-storage';
import { RecipeService } from './recipe.service';

@Injectable({providedIn: 'root'})
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(private dataStorageService: DataStorageService, private recipeService: RecipeService) {}

  resolve() {
    const recipes = this.recipeService.getRecipies();
    if (!recipes.length) {
      return this.dataStorageService.fetchRecipes();
    }
    return recipes;
  }
}
