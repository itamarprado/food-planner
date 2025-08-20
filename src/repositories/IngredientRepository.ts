import { Ingredient } from "../entities/ingredient/ingredient.js";
import type { IUpdateIngredientDataDTO } from "../usecases/ingredient/update/UpdateIngredientByNameDTO.js";

export interface IIngredientRepository {
  save(ingredient: Ingredient): Promise<void>;
  findByName(name: string): Promise<Ingredient | null>;
  findAll(): Promise<Ingredient[]>;
  updateByName(
    name: string,
    data: IUpdateIngredientDataDTO
  ): Promise<Ingredient>;
  deleteByName(name: string): Promise<void>;
}
