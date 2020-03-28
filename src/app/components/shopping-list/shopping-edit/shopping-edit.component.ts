import { Ingredients } from "./../../shared/ingredients.model/ingredients.model";
import {
  Component,
  OnInit,
  ViewChild,
  EventEmitter,
  ElementRef,
  Output,
  OnDestroy
} from "@angular/core";
import { ShopingListService } from "src/app/services/shoping-list.service";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styles: []
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild("shoppingEditForm", { static: false }) form: NgForm;

  editingIgredientSubcription: Subscription;
  editMode = false;
  editItemIndex: number;
  editItem: Ingredients;

  onSubmit(): void {
    let newIngredient = new Ingredients(
      this.form.value.name,
      this.form.value.amount
    );
    if (this.editMode) {
      this._shoppingService.UpdateIngredient(newIngredient, this.editItemIndex);
    } else {
      this._shoppingService.addIngredient(newIngredient);
    }
    this.onClearForm()
  }
  onDeleteItem():void{
    this._shoppingService.deleteingredient(this.editItemIndex)
    this.onClearForm()
  }
  onClearForm():void{
    this._shoppingService.editingIngredient.next({
      ingredient: null,
      index: null
    });
    this.form.reset();
  }

  constructor(private _shoppingService: ShopingListService) {}

  ngOnInit() {
    this.editingIgredientSubcription = this._shoppingService.editingIngredient.subscribe(
      ({ ingredient, index }) => {
        this.editMode = ingredient !== null;
        this.editItem = ingredient;
        this.editItemIndex = index;
        if (this.editItem !== null) {
          this.form.setValue({
            name: this.editItem.name,
            amount: this.editItem.amount
          });
        }
      }
    );
  }
  ngOnDestroy() {
    this.editingIgredientSubcription.unsubscribe();
  }
}
