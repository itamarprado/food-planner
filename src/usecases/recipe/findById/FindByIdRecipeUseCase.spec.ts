import { describe, it, expect, vi, beforeEach } from "vitest";
import { FindByIdRecipeUseCase } from "./FindByIdRecipeUseCase.js";
import { Recipe } from "../../../entities/recipe/recipe.js";
import type { IRecipeRepository } from "../../../repositories/RecipeRepository.js";

describe("FindByIdRecipeUseCase", () => {
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

  it("should return recipe when found", async () => {
    const recipe = Recipe.with({
      id: "recipe-1",
      name: "Test Recipe",
      description: "Test Description",
      howToPrepare: "Test Instructions",
      timeToPrepare: 30,
      portions: 4,
      ingredients: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    mockRepo.findById.mockResolvedValue(recipe);

    const useCase = new FindByIdRecipeUseCase(mockRepo);
    const result = await useCase.execute({ id: "recipe-1" });

    expect(result).not.toBeNull();
    expect(result).toMatchObject({
      id: "recipe-1",
      name: "Test Recipe",
      description: "Test Description",
      howToPrepare: "Test Instructions",
      timeToPrepare: 30,
      portions: 4,
      ingredients: [],
    });
    expect(mockRepo.findById).toHaveBeenCalledWith("recipe-1");
    expect(mockRepo.findById).toHaveBeenCalledTimes(1);
  });

  it("should map all recipe fields correctly to DTO", async () => {
    const recipe = Recipe.with({
      id: "recipe-1",
      name: "Test Recipe",
      description: "Test Description",
      howToPrepare: "Test Instructions",
      timeToPrepare: 30,
      portions: 4,
      ingredients: [
        { name: "flour", quantity: 200, unit: "grams" },
        { name: "sugar", quantity: 100, unit: "grams" },
      ],
      createdAt: new Date("2024-01-01"),
      updatedAt: new Date("2024-01-02"),
    });

    mockRepo.findById.mockResolvedValue(recipe);

    const useCase = new FindByIdRecipeUseCase(mockRepo);
    const result = await useCase.execute({ id: "recipe-1" });

    expect(result).toMatchObject({
      id: "recipe-1",
      name: "Test Recipe",
      description: "Test Description",
      howToPrepare: "Test Instructions",
      timeToPrepare: 30,
      portions: 4,
      ingredients: [
        { name: "flour", quantity: 200, unit: "grams" },
        { name: "sugar", quantity: 100, unit: "grams" },
      ],
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });

  it("should include ingredients in response", async () => {
    const recipe = Recipe.with({
      id: "recipe-1",
      name: "Test Recipe",
      description: "Test Description",
      howToPrepare: "Test Instructions",
      timeToPrepare: 30,
      portions: 4,
      ingredients: [
        { name: "flour", quantity: 200, unit: "grams" },
        { name: "sugar", quantity: 100, unit: "grams" },
        { name: "eggs", quantity: 2, unit: "units" },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    mockRepo.findById.mockResolvedValue(recipe);

    const useCase = new FindByIdRecipeUseCase(mockRepo);
    const result = await useCase.execute({ id: "recipe-1" });

    expect(result).not.toBeNull();
    expect(result!.ingredients).toHaveLength(3);
    expect(result!.ingredients[0]).toEqual({
      name: "flour",
      quantity: 200,
      unit: "grams",
    });
    expect(result!.ingredients[1]).toEqual({
      name: "sugar",
      quantity: 100,
      unit: "grams",
    });
    expect(result!.ingredients[2]).toEqual({
      name: "eggs",
      quantity: 2,
      unit: "units",
    });
  });

  it("should return null when recipe not found", async () => {
    mockRepo.findById.mockResolvedValue(null);

    const useCase = new FindByIdRecipeUseCase(mockRepo);
    const result = await useCase.execute({ id: "non-existent-id" });

    expect(result).toBeNull();
    expect(mockRepo.findById).toHaveBeenCalledWith("non-existent-id");
    expect(mockRepo.findById).toHaveBeenCalledTimes(1);
  });
});
