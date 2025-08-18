import { Ingredient } from "../entities/ingredient/ingredient.ts";
import type { IUpdateIngredientDataDTO } from "../usecases/ingredient/update/UpdateIngredientByNameDTO.ts";

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
