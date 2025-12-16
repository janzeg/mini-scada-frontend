export interface OrderRequestDTO {
  recipeIds: number[];
  createdAt: string;  // ISO string, np. new Date().toISOString()
  deadline: string;   // ISO string
}