import type { IngredientDTO } from "../create/CreateRecipeDTO.js";

export type IFindByIdRecipeRequestDTO = { id: string };

export interface IFindByIdRecipeResponseDTO {
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
