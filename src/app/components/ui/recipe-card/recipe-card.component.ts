import { RecipeService } from './../../../services/recipe.service';
import { Recipe } from './../../shared/recipes.model/recipes.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.css']
})
export class RecipeCardComponent implements OnInit {
  @Input() recipe;
  userInfo:any;



  constructor(private _recipeService:RecipeService) { }

  ngOnInit() {
    this._recipeService.getCreator(this.recipe.creator).subscribe( creator => {
      console.log(creator)
      this.userInfo = creator
    })

  }

}
