import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Recipe } from '../../model/recipe';
import * as bootstrap from 'bootstrap';
import { RecipeManagerService } from '../../services/recipe-manager-service';
import { Chart, PieController, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(PieController, ArcElement, Tooltip, Legend, ChartDataLabels);

@Component({
  selector: 'app-recipe-manager-component',
  standalone: false,
  templateUrl: './recipe-manager-component.html',
  styleUrls: ['./recipe-manager-component.css']
})
export class RecipeManagerComponent {

  @ViewChild('pieChart') pieChartRef!: ElementRef<HTMLCanvasElement>;
  chart!: Chart;

  recipes: Recipe[] = [];
  selectedRecipe?: Recipe;

  newRecipe: Recipe = this.createEmptyRecipe();

  constructor(private recipeService: RecipeManagerService) {}

  ngOnInit() {
    this.loadRecipes();
  }

  // ===================== HELPERS =====================
  private createEmptyRecipe(): Recipe {
    return { name: '', ingredientT1: 0, ingredientT2: 0, mixTime: { minutes: 0, seconds: 0 } };
  }

  private resetNewRecipe() {
    this.newRecipe = this.createEmptyRecipe();
  }

  // ===================== RECIPE CRUD =====================
  loadRecipes() {
    this.recipeService.getRecipes().subscribe((data: Recipe[]) => {
      this.recipes = data;
    });
  }

  selectRecipe(recipe: Recipe) {
    this.selectedRecipe = recipe;
    setTimeout(() => { this.renderChart(recipe); });
  }

  addRecipe() {
    if (!this.newRecipe.name.trim()) return;

    this.recipeService.addRecipe(this.newRecipe).subscribe({
      next: (created: any) => {
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
        this.resetNewRecipe();
        this.hideModal('addRecipeModal');
      },
      error: (err) => console.error('Błąd przy dodawaniu receptury', err)
    });
  }

  deleteRecipe(recipe: Recipe) {
    if (!confirm(`Czy na pewno chcesz usunąć recepturę "${recipe.name}"?`)) return;
    if (!recipe.id) return console.error('Nie można usunąć receptury bez ID');

    this.recipeService.deleteRecipe(recipe.id).subscribe({
      next: () => {
        this.recipes = this.recipes.filter(r => r !== recipe);
        if (this.selectedRecipe === recipe) {
          this.selectedRecipe = undefined;
          this.destroyChart();
        }
      },
      error: (err) => console.error('Błąd przy usuwaniu receptury', err)
    });
  }

  private hideModal(modalId: string) {
    const modalEl = document.getElementById(modalId);
    if (modalEl) {
      const modalInstance = bootstrap.Modal.getInstance(modalEl) as bootstrap.Modal;
      modalInstance?.hide();
    }
  }

  // ===================== CHART =====================
  renderChart(recipe: Recipe) {
    const data = [recipe.ingredientT1, recipe.ingredientT2];

    if (!this.chart && this.pieChartRef) {
      this.chart = new Chart(this.pieChartRef.nativeElement, {
        type: 'pie',
        data: {
          labels: ['T1', 'T2'],
          datasets: [{ data, backgroundColor: ['#00a2ffff', '#176ab8ff'] }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          layout: { padding: 0 },
          plugins: {
            legend: { display: false },
            tooltip: { enabled: true },
            datalabels: {
              color: '#fff',
              formatter: (value, ctx) => ctx.chart.data.labels![ctx.dataIndex],
              font: { weight: 'bold', size: 14 }
            }
          }
        },
        plugins: [ChartDataLabels]
      });
    } else if (this.chart) {
      this.updateChartData(data);
    }
  }

  updateChart() {
    if (!this.selectedRecipe || !this.chart) return;
    this.updateChartData([this.selectedRecipe.ingredientT1, this.selectedRecipe.ingredientT2]);
  }

  private updateChartData(data: number[]) {
    this.chart.data.datasets[0].data = data;
    this.chart.update();
  }

  private destroyChart() {
    this.chart?.destroy();
    this.chart = undefined!;
  }
}
