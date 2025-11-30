import { Recipe } from "../entities/recipe/recipe.js";
import type { IngredientDTO } from "../usecases/recipe/create/CreateRecipeDTO.js";

export interface UpdateRecipeData {
  name?: string;
  description?: string;
  howToPrepare?: string;
  timeToPrepare?: number;
  portions?: number;
  ingredients?: IngredientDTO[];
}

export interface IRecipeRepository {
  save(recipe: Recipe): Promise<void>;
  findByName(name: string): Promise<Recipe | null>;
  findById(id: string): Promise<Recipe | null>;
  findAll(): Promise<Recipe[]>;
  updateById(id: string, data: UpdateRecipeData): Promise<Recipe>;
  deleteById(id: string): Promise<void>;
}
