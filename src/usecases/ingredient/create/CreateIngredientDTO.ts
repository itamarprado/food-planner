import { Ingredient } from "../../../entities/ingredient/ingredient.js";

export interface ICreateIngredientRequestDTO {
  name: string;
  quantity: number;
  unit: string;
}

export type ICreateIngredientResponseDTO = Ingredient;
