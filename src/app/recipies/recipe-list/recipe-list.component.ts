import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipies: Recipe[];
  subscription: Subscription;

  constructor(
      private recipeService: RecipeService,
      private router: Router,
      private route: ActivatedRoute,
    ) { }

  ngOnInit() {
    this.subscription = this.recipeService.recipesChanged.subscribe(
      (recipies: Recipe[]) => {
        this.recipies = recipies;
      }
    )
    this.recipies = this.recipeService.getRecipies();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onAddNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route})
  }

}
