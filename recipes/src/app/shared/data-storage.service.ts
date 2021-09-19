import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {RecipeService} from "../recipes/recipe.service";
import {Recipe} from "../recipes/recipe.model";
import {BehaviorSubject, exhaustMap, map, take, tap} from "rxjs";
import {AuthService} from "../auth/auth.service";
import {User} from "../auth/user.model";

@Injectable()
export class DataStorageService {

  user = new BehaviorSubject<User>(null);
  token: string = null;

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

