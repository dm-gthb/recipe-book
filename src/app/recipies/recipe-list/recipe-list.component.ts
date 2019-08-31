import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
})
export class RecipeListComponent implements OnInit {

  recipies: Recipe[];
  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.recipies = this.recipeService.getRecipies();
  }

}
