import { RecipeService } from "./../../../services/recipe.service";
import { Recipe } from "../../shared/recipes.model/recipes.model";
import { Component, OnInit, Output, EventEmitter, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-recipes-list",
  templateUrl: "./recipes-list.component.html",
  styles: []
})
export class RecipesListComponent implements OnInit{
  recipes: Recipe[];

  onNewRecipe() {
    this.router.navigate(["new"], { relativeTo: this.route });
  }

  constructor(
    public _recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {

    this.route.url.subscribe(res => {
      this._recipeService.getRecipes().subscribe( (NewRecipeList:Recipe[])=>{
        this.recipes = NewRecipeList;
      }, err => console.log(err.status))
    })
  }
}
