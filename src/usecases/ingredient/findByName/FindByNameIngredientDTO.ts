import type { Ingredient } from "../../../entities/ingredient/ingredient.ts";

export interface IFindByNameIngredientRequestDTO {
  name: string;
}

export type IFindByNameIngredientResponseDTO = Ingredient;
