import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
})
export class RecipeListComponent implements OnInit {
  recipies: Recipe[] = [
    new Recipe('test recipe', 'test description', 'https://www.tasteofhome.com/wp-content/uploads/2018/01/Vegetarian-Pad-Thai_EXPS_HCK18_197935_B04_014_4b-1-696x696.jpg'),
    new Recipe('new test recipe', 'test description', 'https://www.tasteofhome.com/wp-content/uploads/2018/01/Roasted-Peppers-and-Cauliflower_EXPS_SDDJ19_30434_E07_20_7b-1024x1024.jpg'),
  ];

  constructor() { }

  ngOnInit() {
  }

}
