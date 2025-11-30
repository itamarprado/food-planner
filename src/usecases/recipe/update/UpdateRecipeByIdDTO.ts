import type { IngredientDTO } from "../create/CreateRecipeDTO.js";

export interface IUpdateRecipeByIdRequestDTO {
  id: string;
  name?: string;
  description?: string;
  howToPrepare?: string;
  timeToPrepare?: number;
  portions?: number;
  ingredients?: IngredientDTO[];
}

export interface IUpdateRecipeByIdResponseDTO {
  id: string;
  name: string;
  description: string;
  howToPrepare: string;
  timeToPrepare: number;
  portions: number;
  ingredients: IngredientDTO[];
  createdAt: Date;
  updatedAt: Date;
}
