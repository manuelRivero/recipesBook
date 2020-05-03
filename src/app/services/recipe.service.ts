import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";
import { Recipe } from "../components/shared/recipes.model/recipes.model";
import { Ingredients } from "../components/shared/ingredients.model/ingredients.model";
import { ShopingListService } from "./shoping-list.service";
import { Observable, BehaviorSubject } from "rxjs";

import { HttpClient } from "@angular/common/http";
import { map, tap } from "rxjs/operators";

const proyectUrl = "https://recipes-b2a18.firebaseio.com/";

export interface Alert {
  type: string;
  hasLink: boolean;
  url: string;
  message: string;
  linkMessage: string;
}

@Injectable({
  providedIn: "root",
})
export class RecipeService {
  private alerta = new BehaviorSubject<Alert | null>(null);
  public alerta$ = this.alerta.asObservable();
  private userToken$: string;
  private userId: string;

  displayTemporaryAlert(
    message: string,
    type: string,
    hasLink: boolean,
    url: string | null,
    linkMessage: string | null
  ): void {
    let alert = { message, type, hasLink, url, linkMessage };
    this.alerta.next(alert);
  }

  getIndexRecipes(): Observable<any[]> {
    let usersRef: AngularFireList<any>;

    let recipes: Observable<any>;

    usersRef = this.afs.list(`recipes/`, (ref) =>
      ref
        .orderByChild(`fallowers/${this.userId}`)
        .equalTo(true)
        .limitToFirst(10)
    );

    recipes = usersRef.snapshotChanges().pipe(
      map((changes) => {
        let recipesList = [];

        changes.map((c) => {
          let documentVal = c.payload.val();
          for (let key in documentVal) {
            if (documentVal[key]["description"]) {
              recipesList.push({ ...documentVal[key], creator: c.payload.key, id: key }) ;
            }
          }
        })
        return recipesList;
      })
    );
    return recipes;
  }
  getRecipeCreator(id:string){
    let usersRef= this.afs.object(`users/${id}`)
    return usersRef.valueChanges()

  }
  getRecipes(): Observable<any[]> {
    let recipesRef: AngularFireList<any>;
    let recipes: Observable<any>;

    recipesRef = this.afs.list(`recipes/${this.userId}`);
    recipes = recipesRef
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ _id: c.payload.key, ...c.payload.val() }))
        )
      );
    return recipes;
  }

  getRecipe(recipeId: string) {
    return this.afs
      .object<any>(`recipes/${this.userId}/${recipeId}`)
      .valueChanges();
  }

  addRecipe(recipe): Promise<any> {
    console.log(recipe);
    console.log(this.userId);
    let userRef = this.afs.list<any>(`recipes/${this.userId}`);

    return userRef
      .push(recipe)
      .then((res) => {
        console.log(res);
        this.displayTemporaryAlert(
          "Yee! your recipe is added successfully,",
          "alert-success",
          true,
          "/recipes/new",
          "want to add another?"
        );
      })
      .catch((err) => console.log(err));
  }

  updateRecipe(recipe): Observable<any> {
    let url = `${proyectUrl}users/manuel/recipes/${recipe.id}.json?auth=${this.userToken$}`;
    const { name, description, imgpath, ingredients } = recipe;
    return this.httpClient
      .patch(url, { name, description, imgpath, ingredients })
      .pipe(
        map((res) => {
          this.displayTemporaryAlert(
            "Updated successfully !,",
            "alert-info",
            true,
            `/recipes/${recipe.id}`,
            "see details ?"
          );
          return res;
        })
      );
  }

  deleteRecipe(id: string): Observable<any> {
    let url = `${proyectUrl}users/manuel/recipes/${id}.json?auth=${this.userToken$}`;
    return this.httpClient.delete(url).pipe(
      map((res) => {
        this.displayTemporaryAlert(
          "delete successfully !,",
          "alert-info",
          false,
          null,
          null
        );
      })
    );
  }

  AddToShoppingList(ingredients: Ingredients[]) {
    this._shoppingListService.addtoShoppingList(ingredients);
    this.displayTemporaryAlert(
      "added successfully !,",
      "alert-success",
      false,
      null,
      null
    );
  }

  constructor(
    private _shoppingListService: ShopingListService,
    private httpClient: HttpClient,
    private _authServie: AuthService,
    private afs: AngularFireDatabase
  ) {
    this._authServie.userToken$.subscribe((user) => {
      if (user) {
        this.userId = user.uid;
      }
    });
    this.displayTemporaryAlert(
      "You should check out some",
      "alert-info",
      true,
      "/recipes/new",
      "new recipes"
    );
  }
}
