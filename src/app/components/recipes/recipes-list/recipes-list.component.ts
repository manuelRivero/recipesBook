import { Recipe } from './../recipes.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styles: []
})
export class RecipesListComponent implements OnInit {
  recipes:Recipe[]=[
    new Recipe('arroz con mariscos', 'un delicioso arroz con cosas marinas', 'https://recetasdepanama.com/wp-content/uploads/2019/03/Arroz-con-mariscos-1024x680.jpg')
  ];
  constructor() { }

  ngOnInit() {
  }

}
