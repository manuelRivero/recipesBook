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
  activeStep:number=0;
  steps:string[]=["Cool name", "Ingredients", "Instructions", "Done"]
  readOnly:boolean=false;
  constructor(
    private route: ActivatedRoute,
    public _recipeService: RecipeService,
    private router: Router
  ) {}

  onNextStep(){
    this.activeStep +=1;
    if(this.activeStep >= this.steps.length -1){
      this.readOnly = true
    }

  }
  onPrevStep(){
    if(this.activeStep <= this.steps.length -1 || this.activeStep >= 0){
      this.activeStep -=1;
      this.readOnly=false
    }

  }

  onSubmit() {
    const { name, imgUrl, description, ingredients } = this.editForm.value;
    let newRecipe = new Recipe(name, description, imgUrl, ingredients, this.id);
    this.activeStep= this.steps.length;
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
    (<FormArray>this.editForm.get("step1")).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  onNewStep(): void {
    (<FormArray>this.editForm.get("step2")).push(
      new FormGroup({
        step: new FormControl(null, Validators.required)
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
    let description = new FormArray([], Validators.required);
    let ingredients = new FormArray([], Validators.required);
    if (this.recipe) {
      name = this.recipe.name;
      imgUrl = this.recipe.imgpath;
      // set up description to be an formControl array
     // description = this.recipe.description;
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
      step0: new FormGroup( {name : new FormControl(name, Validators.required), imgUrl :new FormControl(imgUrl, Validators.required)}),
      step1: ingredients,
      step2: description

    });
  }
}
