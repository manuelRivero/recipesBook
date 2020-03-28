import { Ingredients } from "./../components/shared/ingredients.model/ingredients.model";
import { Injectable} from "@angular/core";
import { Subject } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class ShopingListService {

  ingredientsChanged = new Subject<Ingredients[]>()
  editingIngredient =  new Subject<{ingredient:Ingredients, index:number}>()
  private ingredients: Ingredients[] = [
    new Ingredients("zanahoria", 3),
    new Ingredients("tomate", 5),
    new Ingredients("cebolla", 3),
    new Ingredients("pan", 10)
  ];

  public getIngredients() {
    return [...this.ingredients];
  }

  public editIngredient(id:number):void{
    this.editingIngredient.next({ingredient:this.ingredients[id], index:id})
  }

  public deleteingredient(index:number):void{
    this.ingredients.splice(index, 1)
    this.ingredientsChanged.next([...this.ingredients])
  }

  public UpdateIngredient(updateIngredient:Ingredients, index:number):void{
    this.ingredients[index]=updateIngredient;
    this.ingredientsChanged.next([...this.ingredients])
  }


  public addIngredient(newIngredient: Ingredients): void {
    this.ingredients.push(newIngredient);
    this.ingredientsChanged.next([...this.ingredients])
  }

  public addtoShoppingList(i: Ingredients[]):void {
    i.map((newIngredient: Ingredients, index) => {
      let update = this.ingredients.findIndex(
        ingredient => ingredient.name === newIngredient.name
      );
      if (update > 0) {
        let newAmount = this.ingredients[update].amount + newIngredient.amount;
        this.ingredients[update].amount = newAmount;
      } else {
        this.ingredients.push({...newIngredient});

      }
    });
    this.ingredientsChanged.next(this.ingredients)
  }
  constructor() {}
}
