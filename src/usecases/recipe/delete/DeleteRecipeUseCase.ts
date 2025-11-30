import type { IRecipeRepository } from "../../../repositories/RecipeRepository.js";

export class DeleteRecipeUseCase {
  constructor(private recipeRepository: IRecipeRepository) {}

  async execute(id: string): Promise<void> {
    const recipeToBeDeleted = await this.recipeRepository.findById(id);

    if (!recipeToBeDeleted) {
      throw new Error("Recipe not found.");
    }

    await this.recipeRepository.deleteById(id);
  }
}
