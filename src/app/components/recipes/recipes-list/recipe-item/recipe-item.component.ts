import { RecipeService } from './../../../../services/recipe.service';
import { Recipe } from '../../../shared/recipes.model/recipes.model';
import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe:Recipe;
  constructor() { }

  ngOnInit() {
  }

}
