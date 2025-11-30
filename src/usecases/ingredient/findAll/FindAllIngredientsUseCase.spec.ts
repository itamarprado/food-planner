import { describe, it, expect, vi, beforeEach } from "vitest";
import { FindAllIngredients } from "./FindAllIngredientsUseCase.js";
import { Ingredient } from "../../../entities/ingredient/ingredient.js";

describe("FindAllIngredientsUseCase", () => {
  const mockRepo = {
    findByName: vi.fn(),
    save: vi.fn(),
    findAll: vi.fn(),
    updateByName: vi.fn(),
    deleteByName: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return array of ingredients when ingredients exist", async () => {
    const ingredient1 = Ingredient.create("Sugar", 100, "grams");
    const ingredient2 = Ingredient.create("Flour", 200, "grams");
    mockRepo.findAll.mockResolvedValue([ingredient1, ingredient2]);

    const useCase = new FindAllIngredients(mockRepo);
    const result = await useCase.execute();

    expect(result).toHaveLength(2);
    expect(result[0]).toMatchObject({
      name: "Sugar",
      quantity: 100,
      unit: "grams",
    });
    expect(result[1]).toMatchObject({
      name: "Flour",
      quantity: 200,
      unit: "grams",
    });
    expect(mockRepo.findAll).toHaveBeenCalledTimes(1);
  });

  it("should return empty array when no ingredients exist", async () => {
    mockRepo.findAll.mockResolvedValue([]);

    const useCase = new FindAllIngredients(mockRepo);
    const result = await useCase.execute();

    expect(result).toHaveLength(0);
    expect(result).toEqual([]);
    expect(mockRepo.findAll).toHaveBeenCalledTimes(1);
  });

  it("should map all ingredient fields correctly to DTO", async () => {
    const ingredient = Ingredient.create("Salt", 50, "grams");
    mockRepo.findAll.mockResolvedValue([ingredient]);

    const useCase = new FindAllIngredients(mockRepo);
    const result = await useCase.execute();

    expect(result[0]).toMatchObject({
      name: "Salt",
      quantity: 50,
      unit: "grams",
      createdAt: expect.any(Date),
    });
    expect(result[0]).not.toHaveProperty("updatedAt");
  });

  it("should handle single ingredient in array", async () => {
    const ingredient = Ingredient.create("Sugar", 100, "grams");
    mockRepo.findAll.mockResolvedValue([ingredient]);

    const useCase = new FindAllIngredients(mockRepo);
    const result = await useCase.execute();

    expect(result).toHaveLength(1);
    expect(result[0]!.name).toBe("Sugar");
  });

  it("should handle multiple ingredients in array", async () => {
    const ingredients = [
      Ingredient.create("Sugar", 100, "grams"),
      Ingredient.create("Flour", 200, "grams"),
      Ingredient.create("Salt", 50, "grams"),
    ];
    mockRepo.findAll.mockResolvedValue(ingredients);

    const useCase = new FindAllIngredients(mockRepo);
    const result = await useCase.execute();

    expect(result).toHaveLength(3);
    expect(result[0]!.name).toBe("Sugar");
    expect(result[1]!.name).toBe("Flour");
    expect(result[2]!.name).toBe("Salt");
  });
});
