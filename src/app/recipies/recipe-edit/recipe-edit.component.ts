import { Component } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent {

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  id: number;
  editMode = false;
  imagePath: string;
  recipeEditForm: FormGroup;

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params.id;
          this.editMode = Boolean(params.id);
          this.initForm();
        }
      )
  }

  initForm() {
    let recipeName = '';
    let recipeDescription = '';
    let recipeImagePath = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      this.imagePath = recipe.imagePath;
      recipeName = recipe.name;
      recipeDescription = recipe.description;
      recipeImagePath = recipe.imagePath;
      recipeIngredients = this.createIngredientsFormArray(recipe['ingredients']);
    }

    this.recipeEditForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      ingredients: recipeIngredients
    })
  }

  get ingredientsControls() {
    return (this.recipeEditForm.get('ingredients') as FormArray).controls;
  }

  createIngredientsFormArray = (ingredients: Ingredient[]) => {
    const ingredientsFormArray = new FormArray([]);
    if (ingredients.length) {
      for (const ingredient of ingredients) {
        ingredientsFormArray.push(
          new FormGroup({
            name: new FormControl(ingredient.name, Validators.required),
            amount: new FormControl(ingredient.amount, Validators.required),
          })
        );
      }
    }

    return ingredientsFormArray;
  }

  onAddIngredient() {
    (<FormArray>this.recipeEditForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(),
        amount: new FormControl(),
      })
    )
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeEditForm.get('ingredients')).removeAt(index);
  }

  onSubmit() {
    const newRecipe = this.recipeEditForm.value;
    this.editMode ? this.recipeService.updateRecipe(newRecipe, this.id) : this.recipeService.addRecipe(newRecipe);
    this.router.navigate(['../']);
  }
}
