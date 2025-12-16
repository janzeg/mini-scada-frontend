import { Component } from '@angular/core';
import { Recipe } from '../../model/recipe';
import { Order } from '../../model/order';
import { OrderService } from '../../services/order-service';
import { RecipeManagerService } from '../../services/recipe-manager-service';
import { OrderRequestDTO } from '../../model/order-request-dto';


@Component({
  selector: 'app-order-manager-component',
  standalone: false,
  templateUrl: './order-manager-component.html',
  styleUrl: './order-manager-component.css'
})
export class OrderManagerComponent {

  orders: Order[] = [];
  recipes: Recipe[] = [];

  newOrder: Order = this.createEmptyOrder();

  selectedOrder: any | null = null;

  constructor(
    private orderService: OrderService,
    private recipeService: RecipeManagerService
  ) {}

  ngOnInit() {
    this.loadOrders();
    this.loadRecipes();
  }

  selectOrder(order: any) {
    this.selectedOrder = order;
    this.orderService.setSelectedOrder(order);
  }

  private createEmptyOrder(): Order {
    return {
      recipes: [],
      createdAt: new Date(),
      deadline: new Date(),
    };
  }

  // ===== LOADERS =====
  loadOrders() {
    this.orderService.getOrders().subscribe((data: Order[]) => {
      this.orders = data;
    });
  }

  loadRecipes() {
    this.recipeService.getRecipes().subscribe((data: Recipe[]) => {
      this.recipes = data;
    });
  }

  // ===== ADD ORDER =====
  toggleRecipeInOrder(recipe: Recipe) {
    const index = this.newOrder.recipes.indexOf(recipe);
    if (index >= 0) {
      this.newOrder.recipes.splice(index, 1);
    } else {
      this.newOrder.recipes.push(recipe);
    }
  }

  isRecipeSelected(recipe: Recipe): boolean {
    return this.newOrder.recipes.includes(recipe);
  }

  addOrder() {
    const dto: OrderRequestDTO = {
      recipeIds: this.newOrder.recipes.map(r => r.id!), // mapujemy na ID
      createdAt: new Date(this.newOrder.createdAt).toISOString(),
      deadline: new Date(this.newOrder.deadline).toISOString()
    };

    this.orderService.addOrder(dto).subscribe({
      next: (created: any) => {
        this.orders.push(created);
        this.newOrder = this.createEmptyOrder();
      },
      error: (err: any) => console.error("Błąd podczas dodawania zamówienia", err)
    });
  }


  // ===== DELETE ORDER =====
  deleteOrder(order: Order) {
    if (!order.id) return;
    if (!confirm("Usunąć zamówienie?")) return;

    this.orderService.deleteOrder(order.id).subscribe({
      next: () => {
        this.orders = this.orders.filter(o => o !== order);

        if (this.selectedOrder?.id === order.id) {
          this.selectedOrder = null;
          this.orderService.setSelectedOrder(null);
        }
      }
    });
  }
}
