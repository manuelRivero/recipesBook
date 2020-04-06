import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './services/auth.service';
import { RecipeService } from './services/recipe.service';
import { HeaderComponent } from './components/header/header.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms'
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';




import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { RecipesListComponent } from './components/recipes/recipes-list/recipes-list.component';
import { RecipesDetailComponent } from './components/recipes/recipes-detail/recipes-detail.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './components/shopping-list/shopping-edit/shopping-edit.component';
import { RecipeItemComponent } from './components/recipes/recipes-list/recipe-item/recipe-item.component';
import { DropdownDirective } from './components/shared/directives/dropdown.directive';
import {ShopingListService} from './services/shoping-list.service';
import { RecipePlaceholderComponent } from './components/recipes/recipe-placeholder/recipe-placeholder.component';
import { RecipeEditComponent } from './components/recipes/recipe-edit/recipe-edit.component';
import { LoginComponent } from './components/login/login.component';
import { StepComponent } from './components/ui/step/step.component'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipesListComponent,
    RecipesDetailComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    RecipeItemComponent,
    DropdownDirective,
    RecipePlaceholderComponent,
    RecipeEditComponent,
    LoginComponent,
    StepComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule

  ],
  providers: [ShopingListService, RecipeService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
