export interface Recipe {
    id?: number; 
    name: string;
    ingredientT1: number; // [L]
    ingredientT2: number; // [L]
    mixTime: {
        minutes: number;
        seconds: number;
    };
}
