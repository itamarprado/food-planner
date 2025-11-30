import { describe, it, expect, vi, beforeEach } from "vitest";
import { UpdateRecipeByIdUseCase } from "./UpdateRecipeByIdUseCase.js";
import { Recipe } from "../../../entities/recipe/recipe.js";
import type { IRecipeRepository } from "../../../repositories/RecipeRepository.js";

describe("UpdateRecipeByIdUseCase", () => {
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

  const existingRecipe = Recipe.with({
    id: "recipe-1",
    name: "Original Recipe",
    description: "Original Description",
    howToPrepare: "Original Instructions",
    timeToPrepare: 30,
    portions: 4,
    ingredients: [{ name: "flour", quantity: 200, unit: "grams" }],
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  it("should update single field (name)", async () => {
    mockRepo.findById.mockResolvedValue(existingRecipe);
    const updatedRecipe = Recipe.with({
      id: "recipe-1",
      name: "Updated Recipe Name",
      description: "Original Description",
      howToPrepare: "Original Instructions",
      timeToPrepare: 30,
      portions: 4,
      ingredients: [{ name: "flour", quantity: 200, unit: "grams" }],
      createdAt: existingRecipe.createdAt,
      updatedAt: new Date(),
    });
    mockRepo.updateById.mockResolvedValue(updatedRecipe);

    const useCase = new UpdateRecipeByIdUseCase(mockRepo);
    const result = await useCase.execute({
      id: "recipe-1",
      name: "Updated Recipe Name",
    });

    expect(result.name).toBe("Updated Recipe Name");
    expect(result.description).toBe("Original Description");
    expect(mockRepo.findById).toHaveBeenCalledWith("recipe-1");
    expect(mockRepo.updateById).toHaveBeenCalledWith("recipe-1", {
      name: "Updated Recipe Name",
    });
  });

  it("should update multiple fields", async () => {
    mockRepo.findById.mockResolvedValue(existingRecipe);
    const updatedRecipe = Recipe.with({
      id: "recipe-1",
      name: "Updated Recipe",
      description: "Updated Description",
      howToPrepare: "Original Instructions",
      timeToPrepare: 45,
      portions: 6,
      ingredients: [{ name: "flour", quantity: 200, unit: "grams" }],
      createdAt: existingRecipe.createdAt,
      updatedAt: new Date(),
    });
    mockRepo.updateById.mockResolvedValue(updatedRecipe);

    const useCase = new UpdateRecipeByIdUseCase(mockRepo);
    const result = await useCase.execute({
      id: "recipe-1",
      name: "Updated Recipe",
      description: "Updated Description",
      timeToPrepare: 45,
      portions: 6,
    });

    expect(result.name).toBe("Updated Recipe");
    expect(result.description).toBe("Updated Description");
    expect(result.timeToPrepare).toBe(45);
    expect(result.portions).toBe(6);
    expect(mockRepo.updateById).toHaveBeenCalledWith("recipe-1", {
      name: "Updated Recipe",
      description: "Updated Description",
      timeToPrepare: 45,
      portions: 6,
    });
  });

  it("should update all fields including ingredients", async () => {
    mockRepo.findById.mockResolvedValue(existingRecipe);
    const updatedRecipe = Recipe.with({
      id: "recipe-1",
      name: "Updated Recipe",
      description: "Updated Description",
      howToPrepare: "Updated Instructions",
      timeToPrepare: 60,
      portions: 8,
      ingredients: [
        { name: "sugar", quantity: 100, unit: "grams" },
        { name: "eggs", quantity: 2, unit: "units" },
      ],
      createdAt: existingRecipe.createdAt,
      updatedAt: new Date(),
    });
    mockRepo.updateById.mockResolvedValue(updatedRecipe);

    const useCase = new UpdateRecipeByIdUseCase(mockRepo);
    const result = await useCase.execute({
      id: "recipe-1",
      name: "Updated Recipe",
      description: "Updated Description",
      howToPrepare: "Updated Instructions",
      timeToPrepare: 60,
      portions: 8,
      ingredients: [
        { name: "sugar", quantity: 100, unit: "grams" },
        { name: "eggs", quantity: 2, unit: "units" },
      ],
    });

    expect(result.name).toBe("Updated Recipe");
    expect(result.description).toBe("Updated Description");
    expect(result.howToPrepare).toBe("Updated Instructions");
    expect(result.timeToPrepare).toBe(60);
    expect(result.portions).toBe(8);
    expect(result.ingredients).toHaveLength(2);
    expect(result.ingredients[0]!.name).toBe("sugar");
    expect(result.ingredients[1]!.name).toBe("eggs");
  });

  it("should update only ingredients", async () => {
    mockRepo.findById.mockResolvedValue(existingRecipe);
    const updatedRecipe = Recipe.with({
      id: "recipe-1",
      name: "Original Recipe",
      description: "Original Description",
      howToPrepare: "Original Instructions",
      timeToPrepare: 30,
      portions: 4,
      ingredients: [{ name: "new ingredient", quantity: 50, unit: "grams" }],
      createdAt: existingRecipe.createdAt,
      updatedAt: new Date(),
    });
    mockRepo.updateById.mockResolvedValue(updatedRecipe);

    const useCase = new UpdateRecipeByIdUseCase(mockRepo);
    const result = await useCase.execute({
      id: "recipe-1",
      ingredients: [{ name: "new ingredient", quantity: 50, unit: "grams" }],
    });

    expect(result.name).toBe("Original Recipe");
    expect(result.ingredients).toHaveLength(1);
    expect(result.ingredients[0]!.name).toBe("new ingredient");
    expect(mockRepo.updateById).toHaveBeenCalledWith("recipe-1", {
      ingredients: [{ name: "new ingredient", quantity: 50, unit: "grams" }],
    });
  });

  it("should update only portions and timeToPrepare", async () => {
    mockRepo.findById.mockResolvedValue(existingRecipe);
    const updatedRecipe = Recipe.with({
      id: "recipe-1",
      name: "Original Recipe",
      description: "Original Description",
      howToPrepare: "Original Instructions",
      timeToPrepare: 60,
      portions: 8,
      ingredients: [{ name: "flour", quantity: 200, unit: "grams" }],
      createdAt: existingRecipe.createdAt,
      updatedAt: new Date(),
    });
    mockRepo.updateById.mockResolvedValue(updatedRecipe);

    const useCase = new UpdateRecipeByIdUseCase(mockRepo);
    const result = await useCase.execute({
      id: "recipe-1",
      timeToPrepare: 60,
      portions: 8,
    });

    expect(result.name).toBe("Original Recipe");
    expect(result.timeToPrepare).toBe(60);
    expect(result.portions).toBe(8);
    expect(mockRepo.updateById).toHaveBeenCalledWith("recipe-1", {
      timeToPrepare: 60,
      portions: 8,
    });
  });

  it("should throw an error if recipe not found", async () => {
    mockRepo.findById.mockResolvedValue(null);

    const useCase = new UpdateRecipeByIdUseCase(mockRepo);

    await expect(
      useCase.execute({
        id: "non-existent-id",
        name: "Updated Name",
      })
    ).rejects.toThrow("Recipe not found");
    expect(mockRepo.findById).toHaveBeenCalledWith("non-existent-id");
    expect(mockRepo.updateById).not.toHaveBeenCalled();
  });

  it("should throw an error if no fields provided for update", async () => {
    mockRepo.findById.mockResolvedValue(existingRecipe);

    const useCase = new UpdateRecipeByIdUseCase(mockRepo);

    await expect(
      useCase.execute({
        id: "recipe-1",
      })
    ).rejects.toThrow("At least one field must be provided for update");
    expect(mockRepo.updateById).not.toHaveBeenCalled();
  });

  it("should throw an error if timeToPrepare is negative", async () => {
    mockRepo.findById.mockResolvedValue(existingRecipe);

    const useCase = new UpdateRecipeByIdUseCase(mockRepo);

    await expect(
      useCase.execute({
        id: "recipe-1",
        timeToPrepare: -10,
      })
    ).rejects.toThrow("Time to prepare cannot be negative");
    expect(mockRepo.updateById).not.toHaveBeenCalled();
  });

  it("should throw an error if portions is negative", async () => {
    mockRepo.findById.mockResolvedValue(existingRecipe);

    const useCase = new UpdateRecipeByIdUseCase(mockRepo);

    await expect(
      useCase.execute({
        id: "recipe-1",
        portions: -5,
      })
    ).rejects.toThrow("Portions cannot be negative");
    expect(mockRepo.updateById).not.toHaveBeenCalled();
  });

  it("should throw an error if name is empty string", async () => {
    mockRepo.findById.mockResolvedValue(existingRecipe);

    const useCase = new UpdateRecipeByIdUseCase(mockRepo);

    await expect(
      useCase.execute({
        id: "recipe-1",
        name: "",
      })
    ).rejects.toThrow("Name cannot be empty");
    expect(mockRepo.updateById).not.toHaveBeenCalled();
  });

  it("should throw an error if name is only whitespace", async () => {
    mockRepo.findById.mockResolvedValue(existingRecipe);

    const useCase = new UpdateRecipeByIdUseCase(mockRepo);

    await expect(
      useCase.execute({
        id: "recipe-1",
        name: "   ",
      })
    ).rejects.toThrow("Name cannot be empty");
    expect(mockRepo.updateById).not.toHaveBeenCalled();
  });

  it("should throw an error if recipe ID missing after update", async () => {
    mockRepo.findById.mockResolvedValue(existingRecipe);
    const recipeWithoutId = Recipe.with({
      name: "Updated Recipe",
      description: "Updated Description",
      howToPrepare: "Updated Instructions",
      timeToPrepare: 30,
      portions: 4,
      ingredients: [],
      createdAt: existingRecipe.createdAt,
      updatedAt: new Date(),
    });
    mockRepo.updateById.mockResolvedValue(recipeWithoutId);

    const useCase = new UpdateRecipeByIdUseCase(mockRepo);

    await expect(
      useCase.execute({
        id: "recipe-1",
        name: "Updated Recipe",
      })
    ).rejects.toThrow("Recipe ID is missing after update");
  });

  it("should handle undefined fields correctly (don't update)", async () => {
    mockRepo.findById.mockResolvedValue(existingRecipe);
    const updatedRecipe = Recipe.with({
      id: "recipe-1",
      name: "Original Recipe",
      description: "Updated Description",
      howToPrepare: "Original Instructions",
      timeToPrepare: 30,
      portions: 4,
      ingredients: [{ name: "flour", quantity: 200, unit: "grams" }],
      createdAt: existingRecipe.createdAt,
      updatedAt: new Date(),
    });
    mockRepo.updateById.mockResolvedValue(updatedRecipe);

    const useCase = new UpdateRecipeByIdUseCase(mockRepo);
    const result = await useCase.execute({
      id: "recipe-1",
      description: "Updated Description",
    });

    expect(result.description).toBe("Updated Description");
    expect(result.name).toBe("Original Recipe");
    expect(result.timeToPrepare).toBe(30);
    expect(mockRepo.updateById).toHaveBeenCalledWith("recipe-1", {
      description: "Updated Description",
    });
  });

  it("should validate only provided fields", async () => {
    mockRepo.findById.mockResolvedValue(existingRecipe);
    const updatedRecipe = Recipe.with({
      id: "recipe-1",
      name: "Original Recipe",
      description: "Updated Description",
      howToPrepare: "Original Instructions",
      timeToPrepare: 30,
      portions: 4,
      ingredients: [{ name: "flour", quantity: 200, unit: "grams" }],
      createdAt: existingRecipe.createdAt,
      updatedAt: new Date(),
    });
    mockRepo.updateById.mockResolvedValue(updatedRecipe);

    const useCase = new UpdateRecipeByIdUseCase(mockRepo);

    const result = await useCase.execute({
      id: "recipe-1",
      description: "Updated Description",
    });

    expect(result.description).toBe("Updated Description");
    expect(result.timeToPrepare).toBe(30);
  });
});
