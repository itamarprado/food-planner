import { describe, it, expect, vi, beforeEach } from "vitest";
import { UpdateIngredientByName } from "./UpdateIngredientByNameUseCase.js";
import { Ingredient } from "../../../entities/ingredient/ingredient.js";

describe("UpdateIngredientByNameUseCase", () => {
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

  it("should update only quantity", async () => {
    const existingIngredient = Ingredient.create("Sugar", 100, "grams");
    const updatedIngredient = Ingredient.with({
      name: "Sugar",
      quantity: 200,
      unit: "grams",
      createdAt: existingIngredient.createdAt,
      updatedAt: new Date(),
    });
    mockRepo.findByName.mockResolvedValue(existingIngredient);
    mockRepo.updateByName.mockResolvedValue(updatedIngredient);

    const useCase = new UpdateIngredientByName(mockRepo);
    const result = await useCase.execute({
      name: "Sugar",
      quantity: 200,
    });

    expect(result).toMatchObject({
      name: "Sugar",
      quantity: 200,
      unit: "grams",
    });
    expect(mockRepo.findByName).toHaveBeenCalledWith("Sugar");
    expect(mockRepo.updateByName).toHaveBeenCalledWith("Sugar", {
      quantity: 200,
    });
  });

  it("should update only unit", async () => {
    const existingIngredient = Ingredient.create("Sugar", 100, "grams");
    const updatedIngredient = Ingredient.with({
      name: "Sugar",
      quantity: 100,
      unit: "kilograms",
      createdAt: existingIngredient.createdAt,
      updatedAt: new Date(),
    });
    mockRepo.findByName.mockResolvedValue(existingIngredient);
    mockRepo.updateByName.mockResolvedValue(updatedIngredient);

    const useCase = new UpdateIngredientByName(mockRepo);
    const result = await useCase.execute({
      name: "Sugar",
      unit: "kilograms",
    });

    expect(result).toMatchObject({
      name: "Sugar",
      quantity: 100,
      unit: "kilograms",
    });
    expect(mockRepo.updateByName).toHaveBeenCalledWith("Sugar", {
      unit: "kilograms",
    });
  });

  it("should update both quantity and unit", async () => {
    const existingIngredient = Ingredient.create("Sugar", 100, "grams");
    const updatedIngredient = Ingredient.with({
      name: "Sugar",
      quantity: 500,
      unit: "kilograms",
      createdAt: existingIngredient.createdAt,
      updatedAt: new Date(),
    });
    mockRepo.findByName.mockResolvedValue(existingIngredient);
    mockRepo.updateByName.mockResolvedValue(updatedIngredient);

    const useCase = new UpdateIngredientByName(mockRepo);
    const result = await useCase.execute({
      name: "Sugar",
      quantity: 500,
      unit: "kilograms",
    });

    expect(result).toMatchObject({
      name: "Sugar",
      quantity: 500,
      unit: "kilograms",
    });
    expect(mockRepo.updateByName).toHaveBeenCalledWith("Sugar", {
      quantity: 500,
      unit: "kilograms",
    });
  });

  it("should return updated ingredient with correct fields", async () => {
    const existingIngredient = Ingredient.create("Flour", 200, "grams");
    const updatedIngredient = Ingredient.with({
      name: "Flour",
      quantity: 300,
      unit: "grams",
      createdAt: existingIngredient.createdAt,
      updatedAt: new Date(),
    });
    mockRepo.findByName.mockResolvedValue(existingIngredient);
    mockRepo.updateByName.mockResolvedValue(updatedIngredient);

    const useCase = new UpdateIngredientByName(mockRepo);
    const result = await useCase.execute({
      name: "Flour",
      quantity: 300,
    });

    expect(result).toMatchObject({
      name: "Flour",
      quantity: 300,
      unit: "grams",
      updatedAt: expect.any(Date),
    });
  });

  it("should throw an error if ingredient not found", async () => {
    mockRepo.findByName.mockResolvedValue(null);

    const useCase = new UpdateIngredientByName(mockRepo);

    await expect(
      useCase.execute({
        name: "NonExistent",
        quantity: 100,
      })
    ).rejects.toThrow("Ingredient not found, please check the name.");
    expect(mockRepo.findByName).toHaveBeenCalledWith("NonExistent");
    expect(mockRepo.updateByName).not.toHaveBeenCalled();
  });

  it("should handle empty data object when no fields provided", async () => {
    const existingIngredient = Ingredient.create("Sugar", 100, "grams");
    mockRepo.findByName.mockResolvedValue(existingIngredient);
    mockRepo.updateByName.mockResolvedValue(existingIngredient);

    const useCase = new UpdateIngredientByName(mockRepo);
    const result = await useCase.execute({
      name: "Sugar",
    });

    expect(result).toBeInstanceOf(Ingredient);
    expect(mockRepo.updateByName).toHaveBeenCalledWith("Sugar", {});
  });

  it("should handle undefined fields correctly", async () => {
    const existingIngredient = Ingredient.create("Sugar", 100, "grams");
    const updatedIngredient = Ingredient.with({
      name: "Sugar",
      quantity: 100,
      unit: "kilograms",
      createdAt: existingIngredient.createdAt,
      updatedAt: new Date(),
    });
    mockRepo.findByName.mockResolvedValue(existingIngredient);
    mockRepo.updateByName.mockResolvedValue(updatedIngredient);

    const useCase = new UpdateIngredientByName(mockRepo);
    const result = await useCase.execute({
      name: "Sugar",
      unit: "kilograms",
    });

    expect(result.unit).toBe("kilograms");
    expect(mockRepo.updateByName).toHaveBeenCalledWith("Sugar", {
      unit: "kilograms",
    });
  });

  it("should validate only provided fields", async () => {
    const existingIngredient = Ingredient.create("Sugar", 100, "grams");
    const updatedIngredient = Ingredient.with({
      name: "Sugar",
      quantity: 100,
      unit: "kilograms",
      createdAt: existingIngredient.createdAt,
      updatedAt: new Date(),
    });
    mockRepo.findByName.mockResolvedValue(existingIngredient);
    mockRepo.updateByName.mockResolvedValue(updatedIngredient);

    const useCase = new UpdateIngredientByName(mockRepo);

    const result = await useCase.execute({
      name: "Sugar",
      unit: "kilograms",
    });

    expect(result.unit).toBe("kilograms");
    expect(result.quantity).toBe(100);
  });
});
