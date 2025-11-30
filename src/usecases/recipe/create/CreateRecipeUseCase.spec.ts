import { describe, it, expect, vi, beforeEach } from "vitest";
import { CreateRecipeUseCase } from "./CreateRecipeUseCase.js";
import { Recipe } from "../../../entities/recipe/recipe.js";
import type { IRecipeRepository } from "../../../repositories/RecipeRepository.js";

describe("CreateRecipeUseCase", () => {
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

  const validRecipeData = {
    name: "Test Recipe",
    description: "A test description",
    howToPrepare: "Test instructions",
    timeToPrepare: 30,
    portions: 4,
    ingredients: [
      {
        name: "flour",
        quantity: 200,
        unit: "grams",
      },
    ],
  };

  it("should create a recipe successfully", async () => {
    mockRepo.findByName.mockResolvedValue(null);
    mockRepo.save.mockResolvedValue(undefined);

    const useCase = new CreateRecipeUseCase(mockRepo);
    const result = await useCase.execute(validRecipeData);

    expect(result).toBeInstanceOf(Recipe);
    expect(result.name).toBe("Test Recipe");
    expect(result.description).toBe("A test description");
    expect(result.howToPrepare).toBe("Test instructions");
    expect(result.timeToPrepare).toBe(30);
    expect(result.portions).toBe(4);
    expect(result.ingredients).toHaveLength(1);
    expect(mockRepo.findByName).toHaveBeenCalledWith("Test Recipe");
    expect(mockRepo.save).toHaveBeenCalledTimes(1);
  });

  it("should create a recipe with ingredients", async () => {
    mockRepo.findByName.mockResolvedValue(null);
    mockRepo.save.mockResolvedValue(undefined);

    const useCase = new CreateRecipeUseCase(mockRepo);
    const result = await useCase.execute({
      ...validRecipeData,
      ingredients: [
        { name: "flour", quantity: 200, unit: "grams" },
        { name: "sugar", quantity: 100, unit: "grams" },
      ],
    });

    expect(result).toBeInstanceOf(Recipe);
    expect(result.ingredients).toHaveLength(2);
    expect(result.ingredients[0]!.name).toBe("flour");
    expect(result.ingredients[1]!.name).toBe("sugar");
  });

  it("should create a recipe without ingredients (defaults to empty array)", async () => {
    mockRepo.findByName.mockResolvedValue(null);
    mockRepo.save.mockResolvedValue(undefined);

    const useCase = new CreateRecipeUseCase(mockRepo);
    const result = await useCase.execute({
      name: "Test Recipe",
      description: "A test description",
      howToPrepare: "Test instructions",
      timeToPrepare: 30,
      portions: 4,
    });

    expect(result).toBeInstanceOf(Recipe);
    expect(result.ingredients).toHaveLength(0);
  });

  it("should throw an error if recipe name already exists", async () => {
    const existingRecipe = Recipe.create(
      "Test Recipe",
      "Existing description",
      "Existing instructions",
      20,
      2,
      []
    );
    mockRepo.findByName.mockResolvedValue(existingRecipe);

    const useCase = new CreateRecipeUseCase(mockRepo);

    await expect(useCase.execute(validRecipeData)).rejects.toThrow(
      "Recipe already exists."
    );
    expect(mockRepo.findByName).toHaveBeenCalledWith("Test Recipe");
    expect(mockRepo.save).not.toHaveBeenCalled();
  });

  it("should throw an error if name is empty (entity validation)", async () => {
    mockRepo.findByName.mockResolvedValue(null);

    const useCase = new CreateRecipeUseCase(mockRepo);

    await expect(
      useCase.execute({
        ...validRecipeData,
        name: "",
      })
    ).rejects.toThrow("Name cannot be empty");
    expect(mockRepo.save).not.toHaveBeenCalled();
  });

  it("should throw an error if timeToPrepare is negative (entity validation)", async () => {
    mockRepo.findByName.mockResolvedValue(null);

    const useCase = new CreateRecipeUseCase(mockRepo);

    await expect(
      useCase.execute({
        ...validRecipeData,
        timeToPrepare: -10,
      })
    ).rejects.toThrow("Time to prepare cannot be negative");
    expect(mockRepo.save).not.toHaveBeenCalled();
  });

  it("should throw an error if portions is negative (entity validation)", async () => {
    mockRepo.findByName.mockResolvedValue(null);

    const useCase = new CreateRecipeUseCase(mockRepo);

    await expect(
      useCase.execute({
        ...validRecipeData,
        portions: -5,
      })
    ).rejects.toThrow("Portions cannot be negative");
    expect(mockRepo.save).not.toHaveBeenCalled();
  });
});
