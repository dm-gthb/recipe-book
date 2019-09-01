import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
})
export class RecipeListComponent implements OnInit {

  recipies: Recipe[];
  constructor(
      private recipeService: RecipeService,
      private router: Router,
      private route: ActivatedRoute,
    ) { }

  ngOnInit() {
    this.recipies = this.recipeService.getRecipies();
  }

  onAddNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route})
  }

}
