import { AuthService } from './auth.service';
import { Injectable} from "@angular/core";
import { Recipe } from "../components/shared/recipes.model/recipes.model";
import { Ingredients } from '../components/shared/ingredients.model/ingredients.model';
import { ShopingListService } from './shoping-list.service';
import { Observable, BehaviorSubject } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';

const proyectUrl = "https://recipes-b2a18.firebaseio.com/";

export interface Alert{
  type:string,
  hasLink:boolean,
  url:string,
  message:string,
  linkMessage:string
}


@Injectable({
  providedIn: "root"
})
export class RecipeService{

  private alerta = new BehaviorSubject<Alert | null>(null)
  public alerta$ = this.alerta.asObservable();
  private userToken$:string


  displayTemporaryAlert(message:string, type:string, hasLink:boolean, url:string | null, linkMessage:string | null):void{
    let alert ={message, type, hasLink, url, linkMessage}
    this.alerta.next(alert);
  }
  getRecipes(){
    let getRecipesUrl = `${proyectUrl}users/manuel/recipes.json?auth=${this.userToken$}`;
    return this.httpClient.get(getRecipesUrl).pipe(
      map( (res)=>{
        let recipes:Recipe[]= []
        for( let item in res){
          recipes.push({...res[item], id:item})
        }
      return recipes })
    )
  }

  getRecipe(id:string){
    let getRecipeUrl = `${proyectUrl}users/manuel/recipes/${id}.json?auth=${this.userToken$}`;
    console.log(getRecipeUrl)
    return this.httpClient.get(getRecipeUrl).pipe(
      map( res => {
        return {...res, id}
      })
    )

  }

  addRecipe(recipe:Recipe):Observable<any>{
    let postRecipeUrl= `${proyectUrl}users/manuel/recipes.json?auth=${this.userToken$}`;
    return this.httpClient.post(postRecipeUrl, recipe).pipe(
      map(res =>{
        this.displayTemporaryAlert("Yee! your recipe is added successfully,", "alert-success", true, "/recipes/new", "want to add another?")
      })
    )
  }

  updateRecipe(recipe:Recipe):Observable<any>{
    let url = `${proyectUrl}users/manuel/recipes/${recipe.id}.json?auth=${this.userToken$}`
    const {name, description,imgpath, ingredients} = recipe;
    return this.httpClient.patch(url, {name, description,imgpath,ingredients}).pipe(
      map(res=>{
        this.displayTemporaryAlert("Updated successfully !,", "alert-info", true, `/recipes/${recipe.id}`, "see details ?")
        return res
      })
    )

  }

  deleteRecipe(id:string):Observable<any>{
    let url = `${proyectUrl}users/manuel/recipes/${id}.json?auth=${this.userToken$}`
    return this.httpClient.delete(url).pipe(
      map(res=>{
        this.displayTemporaryAlert("delete successfully !,", "alert-info", false, null, null)

      })
    )
  }

  AddToShoppingList(ingredients:Ingredients[]){
    this._shoppingListService.addtoShoppingList(ingredients);
    this.displayTemporaryAlert("added successfully !,", "alert-success", false, null, null)

  }

  constructor(private _shoppingListService:ShopingListService, private httpClient: HttpClient, private _authServie: AuthService ) {
    this._authServie.userToken$.subscribe( token => this.userToken$=token);
    this.displayTemporaryAlert("You should check out some", "alert-info", true, "/recipes/new", "new recipes")
  }
}
