import { CuisineType } from "./CuisineType";

export type RecipeRequestModel = {
    ingredients: string;
    servings: number;
    cuisineType: CuisineType

}