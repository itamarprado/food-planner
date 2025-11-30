import type {
  IRecipeRepository,
  UpdateRecipeData,
} from "../../../repositories/RecipeRepository.js";
import type {
  IUpdateRecipeByIdRequestDTO,
  IUpdateRecipeByIdResponseDTO,
} from "./UpdateRecipeByIdDTO.js";

export class UpdateRecipeByIdUseCase {
  constructor(private recipeRepository: IRecipeRepository) {}

  async execute(
    request: IUpdateRecipeByIdRequestDTO
  ): Promise<IUpdateRecipeByIdResponseDTO> {
    const existingRecipe = await this.recipeRepository.findById(request.id);
    if (!existingRecipe) {
      throw new Error("Recipe not found");
    }

    const updateData = this.buildUpdateData(request);

    if (Object.keys(updateData).length === 0) {
      throw new Error("At least one field must be provided for update");
    }

    this.validateUpdateData(updateData);

    const updatedRecipe = await this.recipeRepository.updateById(
      request.id,
      updateData
    );

    if (!updatedRecipe.id) {
      throw new Error("Recipe ID is missing after update");
    }

    return this.mapRecipeToDTO(updatedRecipe);
  }

  private buildUpdateData(
    request: IUpdateRecipeByIdRequestDTO
  ): UpdateRecipeData {
    const updateData: UpdateRecipeData = {};

    if (request.name !== undefined) updateData.name = request.name;
    if (request.description !== undefined)
      updateData.description = request.description;
    if (request.howToPrepare !== undefined)
      updateData.howToPrepare = request.howToPrepare;
    if (request.timeToPrepare !== undefined)
      updateData.timeToPrepare = request.timeToPrepare;
    if (request.portions !== undefined) updateData.portions = request.portions;
    if (request.ingredients !== undefined)
      updateData.ingredients = request.ingredients;

    return updateData;
  }

  private validateUpdateData(data: UpdateRecipeData): void {
    if (data.timeToPrepare !== undefined && data.timeToPrepare < 0) {
      throw new Error("Time to prepare cannot be negative");
    }

    if (data.portions !== undefined && data.portions < 0) {
      throw new Error("Portions cannot be negative");
    }

    if (data.name !== undefined && data.name.trim() === "") {
      throw new Error("Name cannot be empty");
    }
  }

  private mapRecipeToDTO(recipe: {
    id: string | undefined;
    name: string;
    description: string;
    howToPrepare: string;
    timeToPrepare: number;
    portions: number;
    ingredients: Array<{ name: string; quantity: number; unit: string }>;
    createdAt: Date;
    updatedAt: Date;
  }): IUpdateRecipeByIdResponseDTO {
    if (!recipe.id) {
      throw new Error("Recipe ID is required");
    }

    return {
      id: recipe.id,
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
