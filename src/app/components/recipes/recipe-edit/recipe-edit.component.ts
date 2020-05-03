import { RecipeService } from "./../../../services/recipe.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormControl, FormArray, Validators } from "@angular/forms";
import { Recipe } from "../../shared/recipes.model/recipes.model";

@Component({
  selector: "app-recipe-edit",
  templateUrl: "./recipe-edit.component.html",
  styleUrls: ["./recipe-edit.component.css"],
})
export class RecipeEditComponent implements OnInit {
  id: string;
  edit;
  editForm: FormGroup;
  recipe: Recipe;
  activeStep: number = 0;
  steps: string[] = ["Cool name", "Ingredients", "Instructions", "Done"];
  readOnly: boolean = false;
  loading: boolean = false;
  directionright: boolean = true;
  images = {
    default: "assets/images/img-placeholder.jpg",
    loading: "assets/images/loader.gif",
    error: "assets/images/error.jpg",
  };

  activeImage;

  constructor(
    private route: ActivatedRoute,
    public _recipeService: RecipeService,
    private router: Router
  ) {}

  onabort() {
    this.editForm.get("step0").get("imgUrl").setErrors({ incorrect: true });
    this.activeImage = this.images.error;
  }

  imgLoad(){
    if(this.activeImage === this.images.error){
      return null;
    }
    this.editForm.get("step0").get("imgUrl").setErrors(null)
  }

  getImg() {

    let imageInput = this.editForm.get("step0").get("imgUrl");
    if (!this.edit) {
      this.activeImage = this.images.default;
    }
    if (imageInput.errors) {
      this.activeImage = this.images.error;
    }else {
       this.activeImage = imageInput.value;
    }
  }

  onNextStep() {
    this.activeStep += 1;
    this.directionright = true;
    if (this.activeStep >= this.steps.length - 1) {
      this.readOnly = true;
    }
  }
  onPrevStep() {
    this.directionright = false;
    if (this.activeStep <= this.steps.length - 1 || this.activeStep >= 0) {
      this.activeStep -= 1;
      this.readOnly = false;
    }
  }

  onSubmit() {
    const { name, description, imgUrl:imgpath} = this.editForm.get('step0').value;
    const ingredients = this.editForm.get('step1').value;
    const instructions = this.editForm.get('step2').value;
    let newRecipe = {name, description, instructions, imgpath, ingredients}
    this.activeStep = this.steps.length;
    this.loading = true;
    if (this.edit) {
      this._recipeService.updateRecipe(newRecipe).subscribe((res) => {
        this.loading = false;
        this.onCancel();
      });
    } else {
      this._recipeService.addRecipe(newRecipe).then((res) => {
        this.loading = false;
        this.onCancel();
      });
    }
  }
  onCancel() {
    this.router.navigate(["/recipes"]);
  }
  onNewIngredient(): void {
    (<FormArray>this.editForm.get("step1")).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  }

  onNewStep(): void {

    (<FormArray>this.editForm.get("step2")).push(
      new FormGroup({
        description: new FormControl(null, Validators.required),
      })
    );
  }

  onDeleteIngredient(ingredientIndex: number): void {
    (<FormArray>this.editForm.get("step1")).removeAt(ingredientIndex);
  }
  ondeleteIntruction(instructionIndex: number):void {
    (<FormArray>this.editForm.get("step2")).removeAt(instructionIndex);

  }
  ngOnInit() {
    this.route.params.subscribe((params) => {
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
    this.activeImage = this.images.default;
    let name = "";
    let imgUrl = "";
    let description = "";
    let instructions = new FormArray([], Validators.required);
    let ingredients = new FormArray([], Validators.required);


    if (this.recipe) {

      name = this.recipe.name;
      imgUrl = this.recipe.imgpath;
      description = this.recipe.description;
      this.activeImage = this.recipe.imgpath;

      if (this.recipe["ingredients"]) {
        for (let i of this.recipe.ingredients) {
          ingredients.push(
            new FormGroup({
              name: new FormControl(i.name, Validators.required),
              amount: new FormControl(i.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/),
              ]),
            })
          );
        }
      }
      for (let i of this.recipe.instructions) {
        instructions.push(
          new FormGroup({
            description: new FormControl(i.description, Validators.required)
          })
          )
      }
    }

    this.editForm = new FormGroup({
      step0: new FormGroup({
        name: new FormControl(name, Validators.required),
        imgUrl: new FormControl(imgUrl, Validators.required),
        description:new FormControl(description, Validators.required)
      }),
      step1: ingredients,
      step2: instructions,
    });
  }
}
