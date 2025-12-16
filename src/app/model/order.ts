import { Recipe } from "./recipe";

export interface Order {
  id?: number;
  recipes: Recipe[];

  createdAt: Date;
  deadline: Date;
  finishedAt?: Date;
}
