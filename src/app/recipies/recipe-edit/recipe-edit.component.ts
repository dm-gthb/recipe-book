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
          this.editMode = params.id !== null;
          this.initForm();
        }
      )
  }

  initForm() {
    const recipe = this.recipeService.getRecipe(this.id);
    this.imagePath = recipe.imagePath;

    const createIngredientsFormArray = (ingredients: Ingredient[]) => {
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

    if (this.editMode) {
      this.recipeEditForm = new FormGroup({
        name: new FormControl(this.editMode ? recipe.name : '', Validators.required),
        description: new FormControl(this.editMode ? recipe.description : '', Validators.required),
        imagePath: new FormControl(this.editMode ? recipe.imagePath : '', Validators.required),
        ingredients: this.editMode ? createIngredientsFormArray(recipe['ingredients']) : new FormArray([]),
      })
    }
  }

  get ingredientsControls() {
    return (this.recipeEditForm.get('ingredients') as FormArray).controls;
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
    this.recipeService.updateRecipe(this.recipeEditForm.value, this.id);
    this.router.navigate(['../']);
  }
}
