import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Recipe} from "../recipe.model";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  @Output() recipeWasSelected = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe('Pannekaker', 'Nam Nam', 'https://p0.piqsels.com/preview/940/398/420/sweet-dish-pancakes-dessert-pancake-thumbnail.jpg'),
    new Recipe('Pannekaker 1', 'Nam Nam', 'https://p0.piqsels.com/preview/940/398/420/sweet-dish-pancakes-dessert-pancake-thumbnail.jpg'),
    new Recipe('Pannekaker 2', 'Nam Nam', 'https://p0.piqsels.com/preview/940/398/420/sweet-dish-pancakes-dessert-pancake-thumbnail.jpg')
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }
}
