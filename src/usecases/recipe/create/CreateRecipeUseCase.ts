import { Recipe } from "../../../entities/recipe/recipe.js";
import type { IRecipeRepository } from "../../../repositories/RecipeRepository.js";
import type {
  ICreateRecipeRequestDTO,
  ICreateRecipeResponseDTO,
} from "./CreateRecipeDTO.js";

export class CreateRecipeUseCase {
  constructor(private recipeRepository: IRecipeRepository) {}
  async execute({
    name,
    description,
    howToPrepare,
    timeToPrepare,
    portions,
    ingredients,
  }: ICreateRecipeRequestDTO): Promise<ICreateRecipeResponseDTO> {
    const recipeAlreadyExists = await this.recipeRepository.findByName(name);

    if (recipeAlreadyExists) {
      throw new Error("Recipe already exists.");
    }

    const newRecipe = Recipe.create(
      name,
      description,
      howToPrepare,
      timeToPrepare,
      portions,
      ingredients ? ingredients : []
    );

    await this.recipeRepository.save(newRecipe);
    return newRecipe;
  }
}
