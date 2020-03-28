import { Subscription } from 'rxjs';
import { RecipeService, Alert } from './../../../services/recipe.service';
import { Component, OnInit, OnDestroy } from '@angular/core';


@Component({
  selector: 'app-recipe-placeholder',
  templateUrl: './recipe-placeholder.component.html',
  styleUrls: ['./recipe-placeholder.component.css']
})
export class RecipePlaceholderComponent implements OnInit {

  constructor(public _recipeService:RecipeService) { }

  ngOnInit() {}
}
