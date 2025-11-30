import { Recipe } from "../../../entities/recipe/recipe.js";

export interface IngredientDTO {
  name: string;
  quantity: number;
  unit: string;
}

export interface ICreateRecipeRequestDTO {
  name: string;
  description: string;
  howToPrepare: string;
  timeToPrepare: number;
  portions: number;
  ingredients?: IngredientDTO[];
}

export type ICreateRecipeResponseDTO = Recipe;
