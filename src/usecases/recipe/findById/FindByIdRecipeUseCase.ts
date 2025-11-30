import type { IRecipeRepository } from "../../../repositories/RecipeRepository.js";
import type {
  IFindByIdRecipeRequestDTO,
  IFindByIdRecipeResponseDTO,
} from "./FindByIdRecipeDTO.js";

export class FindByIdRecipeUseCase {
  constructor(private recipeRepository: IRecipeRepository) {}
  async execute(
    request: IFindByIdRecipeRequestDTO
  ): Promise<IFindByIdRecipeResponseDTO | null> {
    const recipe = await this.recipeRepository.findById(request.id);

    if (!recipe) {
      return null;
    }

    return {
      id: recipe.id!,
      name: recipe.name,
      description: recipe.description,
      howToPrepare: recipe.howToPrepare,
      timeToPrepare: recipe.timeToPrepare,
      portions: recipe.portions,
      ingredients: recipe.ingredients,
      createdAt: recipe.createdAt,
      updatedAt: recipe.updatedAt,
    };
  }
}
