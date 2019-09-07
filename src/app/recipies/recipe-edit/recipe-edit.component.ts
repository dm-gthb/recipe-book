import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html'
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

    if (this.editMode) {
      this.recipeEditForm = new FormGroup({
        name: new FormControl(this.editMode ? recipe.name : ''),
        description: new FormControl(this.editMode ? recipe.description : ''),
        imagePath: new FormControl(this.editMode ? recipe.imagePath : ''),
      })
    }
  }

  onSubmit() {
    this.recipeService.updateRecipe(this.recipeEditForm.value, this.id);
    this.router.navigate(['../']);
  }
}
