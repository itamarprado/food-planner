import type { IRecipeRepository } from "../../../repositories/RecipeRepository.js";
import type { IFindAllRecipesResponseDTO } from "./FindAllRecipesDTO.js";

export class FindAllRecipes {
  constructor(private IRecipeRepository: IRecipeRepository) {}

  async execute(): Promise<IFindAllRecipesResponseDTO[]> {
    const recipesFound = await this.IRecipeRepository.findAll();

    if (recipesFound.length === 0) {
      return [];
    }

    return recipesFound.map((r) => ({
      id: r.id!,
      name: r.name,
      description: r.description,
      howToPrepare: r.howToPrepare,
      timeToPrepare: r.timeToPrepare,
      portions: r.portions,
      ingredients: r.ingredients,
      createdAt: r.createdAt,
      updatedAt: r.updatedAt,
    }));
  }
}
