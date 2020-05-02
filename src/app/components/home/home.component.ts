import { RecipeService } from './../../services/recipe.service';
import { Recipe } from './../shared/recipes.model/recipes.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  recipeList:Recipe[]=[]

  constructor(private _recipeService:RecipeService) { }

  ngOnInit() {
    this._recipeService.getIndexRecipes().subscribe( (recipes: Recipe[]) => {
      this.recipeList = recipes
    })
  }


}
