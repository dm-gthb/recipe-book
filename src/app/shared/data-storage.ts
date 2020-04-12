import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { RecipeService } from '../recipies/recipe.service';
import { Recipe } from '../recipies/recipe.model';

@Injectable({providedIn: 'root'})
export class DataStorageService {
  constructor(private http: HttpClient, private recipesService: RecipeService) {}

  storeRecipes() {
    const recipes = this.recipesService.getRecipies();
    this.http.put('https://ng-recipe-21059.firebaseio.com/recipes.json', recipes)
      .subscribe(res => {
        console.log(res);
      });
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>('https://ng-recipe-21059.firebaseio.com/recipes.json')
      .pipe(
        map(recipes => {
          return recipes.map(recipe => ({...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}));
        }),
        tap(recipes => this.recipesService.setRecipes(recipes))
      );
  }
}