import { Recipe } from './recipe.model';
import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private recipies: Recipe[] = [
    new Recipe(
      'test recipe',
      'test description',
      'https://www.tasteofhome.com/wp-content/uploads/2018/01/Vegetarian-Pad-Thai_EXPS_HCK18_197935_B04_014_4b-1-696x696.jpg',
      [
        new Ingredient('test ingredient', 2),
        new Ingredient('another ingredient', 3),
        new Ingredient('zzz', 100),
      ],
    ),
    new Recipe(
      'new test recipe',
      'test description',
      'https://www.tasteofhome.com/wp-content/uploads/2018/01/Roasted-Peppers-and-Cauliflower_EXPS_SDDJ19_30434_E07_20_7b-1024x1024.jpg',
      [
        new Ingredient('ingredient', 5),
        new Ingredient('another ingredient', 1),
      ],
    ),
  ];

  recipeSelected = new EventEmitter<Recipe>();

  getRecipies() {
    return this.recipies;
  }
}
