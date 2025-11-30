import type { IngredientDTO } from "../create/CreateRecipeDTO.js";

export interface IFindAllRecipesResponseDTO {
  id: string;
  name: string;
  description: string;
  howToPrepare: string;
  timeToPrepare: number; // in minutes
  portions: number;
  ingredients: IngredientDTO[];
  createdAt: Date;
  updatedAt: Date;
}
