import { describe, it, expect, vi, beforeEach } from "vitest";
import { DeleteRecipeUseCase } from "./DeleteRecipeUseCase.js";
import { Recipe } from "../../../entities/recipe/recipe.js";
import type { IRecipeRepository } from "../../../repositories/RecipeRepository.js";

describe("DeleteRecipeUseCase", () => {
  const mockRepo = {
    findByName: vi.fn(),
    findById: vi.fn(),
    findAll: vi.fn(),
    save: vi.fn(),
    updateById: vi.fn(),
    deleteById: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should delete recipe successfully when found", async () => {
    const recipeToDelete = Recipe.with({
      id: "recipe-1",
      name: "Recipe to Delete",
      description: "Description",
      howToPrepare: "Instructions",
      timeToPrepare: 30,
      portions: 4,
      ingredients: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    mockRepo.findById.mockResolvedValue(recipeToDelete);
    mockRepo.deleteById.mockResolvedValue(undefined);

    const useCase = new DeleteRecipeUseCase(mockRepo);
    await useCase.execute("recipe-1");

    expect(mockRepo.findById).toHaveBeenCalledWith("recipe-1");
    expect(mockRepo.findById).toHaveBeenCalledTimes(1);
    expect(mockRepo.deleteById).toHaveBeenCalledWith("recipe-1");
    expect(mockRepo.deleteById).toHaveBeenCalledTimes(1);
  });

  it("should throw an error if recipe not found", async () => {
    mockRepo.findById.mockResolvedValue(null);

    const useCase = new DeleteRecipeUseCase(mockRepo);

    await expect(useCase.execute("non-existent-id")).rejects.toThrow(
      "Recipe not found."
    );
    expect(mockRepo.findById).toHaveBeenCalledWith("non-existent-id");
    expect(mockRepo.deleteById).not.toHaveBeenCalled();
  });
});
