import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map, tap, take, exhaustMap} from 'rxjs/operators';

import {Recipe} from '../recipes/recipe.model';
import {RecipeService} from '../recipes/recipe.service';
import {AuthService} from '../auth/auth.service';

@Injectable({providedIn: 'root'})
export class DataStorageService {

  url: string = 'https://ng-complete-guide-158ba-default-rtdb.europe-west1.firebasedatabase.app/recipes.json';

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {
  }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put(this.url, recipes).subscribe(response => console.log(response));
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(this.url)
      .pipe(
        map(recipes => recipes.map(recipe => ({...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}))),
        tap(recipes => this.recipeService.setRecipes(recipes))
      );
  }
}
