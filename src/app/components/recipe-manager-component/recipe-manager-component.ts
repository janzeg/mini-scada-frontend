import { Component } from '@angular/core';
import { Recipe } from '../../model/recipe';
import * as bootstrap from 'bootstrap';
import { RecipeManagerService } from '../../services/recipe-manager-service';

@Component({
  selector: 'app-recipe-manager-component',
  standalone: false,
  templateUrl: './recipe-manager-component.html',
  styleUrl: './recipe-manager-component.css'
})
export class RecipeManagerComponent {

  recipes: Recipe[] = [];

  newRecipe: Recipe = {
    name: '',
    ingredientT1: 0,
    ingredientT2: 0,
    mixTime: { minutes: 0, seconds: 0 }
  };

  selectedRecipe?: Recipe;

  constructor(private recipeService: RecipeManagerService) {}

  ngOnInit() {
    this.loadRecipes();
  }

  loadRecipes() {
    this.recipeService.getRecipes().subscribe((data: Recipe[]) => {
      this.recipes = data;
    });
  }

  selectRecipe(recipe: Recipe) {
    this.selectedRecipe = recipe;
  }

  addRecipe() {
  if (!this.newRecipe.name.trim()) return;

  this.recipeService.addRecipe(this.newRecipe).subscribe({
      next: (created: any) => {
        // dodanie do lokalnej listy dla natychmiastowego widoku
        const recipe: Recipe = {
          name: created.name,
          ingredientT1: created.ingredientT1,
          ingredientT2: created.ingredientT2,
          mixTime: {
            minutes: Math.floor(created.mixTimeSeconds / 60),
            seconds: created.mixTimeSeconds % 60
          }
        };
        this.recipes.push(recipe);

        // reset formularza
        this.newRecipe = { name: '', ingredientT1: 0, ingredientT2: 0, mixTime: { minutes: 0, seconds: 0 } };

        // zamknięcie modala (Bootstrap)
        const modal = document.getElementById('addRecipeModal');
        if (modal) {
          const modalInstance = bootstrap.Modal.getInstance(modal) as bootstrap.Modal;
          modalInstance.hide();
        }
      },
      error: (err) => console.error('Błąd przy dodawaniu receptury', err)
    });
  }

  deleteRecipe(recipe: Recipe) {
  if (!confirm(`Czy na pewno chcesz usunąć recepturę "${recipe.name}"?`)) return;

  if (!recipe.id) {
    console.error('Nie można usunąć receptury bez ID');
    return;
  }

  this.recipeService.deleteRecipe(recipe.id).subscribe({
    next: () => {
      const index = this.recipes.indexOf(recipe);
      if (index > -1) {
        this.recipes.splice(index, 1);
        if (this.selectedRecipe === recipe) this.selectedRecipe = undefined;
      }
    },
    error: (err) => console.error('Błąd przy usuwaniu receptury', err)
  });
}



}
