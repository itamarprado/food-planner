import { Ingredient } from "../../../entities/ingredient/ingredient.ts";

export interface ICreateIngredientRequestDTO {
  name: string;
  quantity: number;
  unit: string;
}

export type ICreateIngredientResponseDTO = Ingredient;
