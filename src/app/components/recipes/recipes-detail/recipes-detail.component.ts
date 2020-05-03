import { RecipeService } from './../../../services/recipe.service';
import { Recipe } from '../../shared/recipes.model/recipes.model';
import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styles: []
})
export class RecipesDetailComponent implements OnInit {
  recipe:Recipe;
  recipeId:string;
  show=false;

  onAddToShoppingList(){
    this._recipesService.AddToShoppingList(this.recipe.ingredients)
  }

  onEditRecipe(){
    this.router.navigate(['edit'], {relativeTo:this.route})
  }

  onDeleteRecipe(){
    this._recipesService.deleteRecipe(this.recipeId).subscribe(res=>{
      this.router.navigate(['/'])
    })
  }
  constructor(private _recipesService:RecipeService,
     private route: ActivatedRoute,
     private router: Router) { }

  ngOnInit() {
  this.route.params
  .subscribe( (params:Params) =>{
    this.recipeId = params['id'];
    this._recipesService.getRecipe(this.recipeId).subscribe(( res)=> {
      this.recipe=res;
    })
  })
  }

}
