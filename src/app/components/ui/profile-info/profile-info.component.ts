import { RecipeService } from './../../../services/recipe.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css']
})
export class ProfileInfoComponent implements OnInit {
  @Input() userId;
  profile;

  constructor(private _recipeService:RecipeService) { }

  ngOnInit() {
    this._recipeService.getRecipeCreator(this.userId).subscribe( res =>{
      console.log(res)
      this.profile = res;
    })
  }

}
