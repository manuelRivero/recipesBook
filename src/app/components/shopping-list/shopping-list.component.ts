import { Ingredients } from './../shared/ingredients.model/ingredients.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShopingListService } from 'src/app/services/shoping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styles: []
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients:Ingredients[];
  ingredientListSubcrition: Subscription;


  constructor(private _shoppingService:ShopingListService) { }

  ngOnInit() {
     this.ingredients = this._shoppingService.getIngredients()
     this.ingredientListSubcrition = this._shoppingService.ingredientsChanged.subscribe( (res:Ingredients[])=>{
       console.log("ingredientes update")
       this.ingredients = res;
     })
  }

  onEditIngredient(index:number){
    this._shoppingService.editIngredient(index);
  }

  ngOnDestroy(){
    this.ingredientListSubcrition.unsubscribe()
  }
}
