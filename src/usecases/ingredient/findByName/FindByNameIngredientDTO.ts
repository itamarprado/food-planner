import type { Ingredient } from "../../../entities/ingredient/ingredient.js";

export interface IFindByNameIngredientRequestDTO {
  name: string;
}

export type IFindByNameIngredientResponseDTO = Ingredient;
