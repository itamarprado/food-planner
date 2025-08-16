import { Ingredient } from "../entities/ingredient/ingredient.ts";

export interface IIngredientRepository {
  save(ingredient: Ingredient): Promise<void>;
  findByName(name: string): Promise<Ingredient | null>;
  findAll(): Promise<Ingredient[]>;
}
