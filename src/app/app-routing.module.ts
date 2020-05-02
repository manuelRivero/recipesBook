import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginGuard } from './auth/Login.guard';

import { LoginComponent } from './components/login/login.component';
import { RecipeEditComponent } from './components/recipes/recipe-edit/recipe-edit.component';
import { RecipePlaceholderComponent } from './components/recipes/recipe-placeholder/recipe-placeholder.component';
import { RecipesDetailComponent } from './components/recipes/recipes-detail/recipes-detail.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './components/recipes/recipes.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';


const routes: Routes = [
  {path:"", redirectTo:"home", pathMatch:"full"},
  {path:"home", component:HomeComponent, canActivate:[AuthGuard]},
  {path:"recipes", component:RecipesComponent, children:[
    {path:"", component:RecipePlaceholderComponent},
    {path:"new", component:RecipeEditComponent},
    {path:":id", component:RecipesDetailComponent},
    {path:":id/edit", component: RecipeEditComponent}
  ], canActivate:[AuthGuard]},
  {path:"login", component:LoginComponent, canActivate:[LoginGuard]},
  {path:"shop", component:ShoppingListComponent, canActivate:[AuthGuard]},
  {path:"**", redirectTo:"recipes"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
