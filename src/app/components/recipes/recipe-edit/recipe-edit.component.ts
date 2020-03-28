import { RecipeService } from "./../../../services/recipe.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormControl, FormArray, Validators } from "@angular/forms";
import { Recipe } from "../../shared/recipes.model/recipes.model";

@Component({
  selector: "app-recipe-edit",
  templateUrl: "./recipe-edit.component.html",
  styleUrls: ["./recipe-edit.component.css"]
})
export class RecipeEditComponent implements OnInit {
  id: string;
  edit;
  editForm: FormGroup;
  recipe: Recipe;

  constructor(
    private route: ActivatedRoute,
    public _recipeService: RecipeService,
    private router: Router
  ) {}

  onSubmit() {
    const { name, imgUrl, description, ingredients } = this.editForm.value;
    let newRecipe = new Recipe(name, description, imgUrl, ingredients, this.id);
    if (this.edit) {
      this._recipeService.updateRecipe(newRecipe).subscribe( res =>{
        this.onCancel()
      })
    } else {
      this._recipeService.addRecipe(this.editForm.value).subscribe(res => {
        this.onCancel()
      })
    }
  }
  onCancel(){
    this.router.navigate(["/recipes"])
  }
  onNewIngredient(): void {
    (<FormArray>this.editForm.get("ingredients")).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  onDeleteIngredient(ingredientIndex: number): void {
    (<FormArray>this.editForm.get("ingredients")).removeAt(ingredientIndex);
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.edit = params["id"] != null;
      if (this.edit) {
        this.id = params["id"];
        this._recipeService.getRecipe(this.id).subscribe((res: Recipe) => {
          this.recipe = res;
          this.formInit();
        });
      }
      this.formInit();
    });
  }

  formInit() {
    let name = "";
    let imgUrl = "";
    let description = "";
    let ingredients = new FormArray([]);
    if (this.recipe) {
      name = this.recipe.name;
      imgUrl = this.recipe.imgpath;
      description = this.recipe.description;
      if (this.recipe["ingredients"]) {
        for (let i of this.recipe.ingredients) {
          ingredients.push(
            new FormGroup({
              name: new FormControl(i.name, Validators.required),
              amount: new FormControl(i.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          );
        }
      }
    }
    this.editForm = new FormGroup({
      name: new FormControl(name, Validators.required),
      imgUrl: new FormControl(imgUrl, Validators.required),
      description: new FormControl(description, Validators.required),
      ingredients: ingredients
    });
  }
}
