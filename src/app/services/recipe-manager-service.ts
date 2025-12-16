import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Recipe } from '../model/recipe';
import { Order } from '../model/order';


@Injectable({
  providedIn: 'root'
})
export class RecipeManagerService {
  
  private apiUrl = 'http://localhost:8090/api/recipes';

  constructor(private http: HttpClient) {}

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => {
        const recipes = response._embedded?.recipes || [];
        return recipes.map((r: any) => ({
          id: r.id,
          name: r.name,
          ingredientT1: r.ingredientT1,
          ingredientT2: r.ingredientT2,
          mixTime: {
            minutes: r.mixTimeMinutes ?? Math.floor(r.mixTimeSeconds / 60),
            seconds: r.mixTimeRemainingSeconds ?? (r.mixTimeSeconds % 60)
          }
        }));
      })
    );
  }

  addRecipe(recipe: Recipe): Observable<any> {
    // mapujemy do formatu backendu
    const body = {
      name: recipe.name,
      ingredientT1: recipe.ingredientT1,
      ingredientT2: recipe.ingredientT2,
      mixTimeSeconds: recipe.mixTime.minutes * 60 + recipe.mixTime.seconds
    };
    return this.http.post(this.apiUrl, body);
  }

  deleteRecipe(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  
}
