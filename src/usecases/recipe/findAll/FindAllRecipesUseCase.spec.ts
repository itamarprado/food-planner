import { describe, it, expect, vi, beforeEach } from "vitest";
import { FindAllRecipes } from "./FindAllRecipesUseCase.js";
import { Recipe } from "../../../entities/recipe/recipe.js";
import type { IRecipeRepository } from "../../../repositories/RecipeRepository.js";

describe("FindAllRecipesUseCase", () => {
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

  it("should return array of recipes when recipes exist", async () => {
    const recipe1 = Recipe.with({
      id: "recipe-1",
      name: "Recipe 1",
      description: "Description 1",
      howToPrepare: "Instructions 1",
      timeToPrepare: 30,
      portions: 4,
      ingredients: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const recipe2 = Recipe.with({
      id: "recipe-2",
      name: "Recipe 2",
      description: "Description 2",
      howToPrepare: "Instructions 2",
      timeToPrepare: 45,
      portions: 6,
      ingredients: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    mockRepo.findAll.mockResolvedValue([recipe1, recipe2]);

    const useCase = new FindAllRecipes(mockRepo);
    const result = await useCase.execute();

    expect(result).toHaveLength(2);
    expect(result[0]).toMatchObject({
      id: "recipe-1",
      name: "Recipe 1",
      description: "Description 1",
      howToPrepare: "Instructions 1",
      timeToPrepare: 30,
      portions: 4,
      ingredients: [],
    });
    expect(result[1]).toMatchObject({
      id: "recipe-2",
      name: "Recipe 2",
      description: "Description 2",
      howToPrepare: "Instructions 2",
      timeToPrepare: 45,
      portions: 6,
      ingredients: [],
    });
    expect(mockRepo.findAll).toHaveBeenCalledTimes(1);
  });

  it("should return empty array when no recipes exist", async () => {
    mockRepo.findAll.mockResolvedValue([]);

    const useCase = new FindAllRecipes(mockRepo);
    const result = await useCase.execute();

    expect(result).toHaveLength(0);
    expect(result).toEqual([]);
    expect(mockRepo.findAll).toHaveBeenCalledTimes(1);
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

    mockRepo.findAll.mockResolvedValue([recipe]);

    const useCase = new FindAllRecipes(mockRepo);
    const result = await useCase.execute();

    expect(result[0]).toMatchObject({
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

  it("should handle single recipe in array", async () => {
    const recipe = Recipe.with({
      id: "recipe-1",
      name: "Single Recipe",
      description: "Description",
      howToPrepare: "Instructions",
      timeToPrepare: 20,
      portions: 2,
      ingredients: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    mockRepo.findAll.mockResolvedValue([recipe]);

    const useCase = new FindAllRecipes(mockRepo);
    const result = await useCase.execute();

    expect(result).toHaveLength(1);
    expect(result[0]!.name).toBe("Single Recipe");
  });

  it("should handle multiple recipes in array", async () => {
    const recipes = [
      Recipe.with({
        id: "recipe-1",
        name: "Recipe 1",
        description: "Description 1",
        howToPrepare: "Instructions 1",
        timeToPrepare: 30,
        portions: 4,
        ingredients: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
      Recipe.with({
        id: "recipe-2",
        name: "Recipe 2",
        description: "Description 2",
        howToPrepare: "Instructions 2",
        timeToPrepare: 45,
        portions: 6,
        ingredients: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
      Recipe.with({
        id: "recipe-3",
        name: "Recipe 3",
        description: "Description 3",
        howToPrepare: "Instructions 3",
        timeToPrepare: 60,
        portions: 8,
        ingredients: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    ];

    mockRepo.findAll.mockResolvedValue(recipes);

    const useCase = new FindAllRecipes(mockRepo);
    const result = await useCase.execute();

    expect(result).toHaveLength(3);
    expect(result[0]!.name).toBe("Recipe 1");
    expect(result[1]!.name).toBe("Recipe 2");
    expect(result[2]!.name).toBe("Recipe 3");
  });
});
