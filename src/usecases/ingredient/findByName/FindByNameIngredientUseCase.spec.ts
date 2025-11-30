import { describe, it, expect, vi, beforeEach } from "vitest";
import { FindByNameIngredient } from "./FindByNameIngredientUseCase.js";
import { Ingredient } from "../../../entities/ingredient/ingredient.js";

describe("FindByNameIngredientUseCase", () => {
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

  it("should return ingredient when found", async () => {
    const ingredient = Ingredient.create("Sugar", 100, "grams");
    mockRepo.findByName.mockResolvedValue(ingredient);

    const useCase = new FindByNameIngredient(mockRepo);
    const result = await useCase.execute({ name: "Sugar" });

    expect(result).toBeInstanceOf(Ingredient);
    expect(result).not.toBeNull();
    expect(result!.name).toBe("Sugar");
    expect(result!.quantity).toBe(100);
    expect(result!.unit).toBe("grams");
    expect(mockRepo.findByName).toHaveBeenCalledWith("Sugar");
    expect(mockRepo.findByName).toHaveBeenCalledTimes(1);
  });

  it("should return the ingredient entity directly", async () => {
    const ingredient = Ingredient.create("Flour", 200, "grams");
    mockRepo.findByName.mockResolvedValue(ingredient);

    const useCase = new FindByNameIngredient(mockRepo);
    const result = await useCase.execute({ name: "Flour" });

    expect(result).toBeInstanceOf(Ingredient);
    expect(result).toBe(ingredient);
  });

  it("should return null when ingredient not found", async () => {
    mockRepo.findByName.mockResolvedValue(null);

    const useCase = new FindByNameIngredient(mockRepo);
    const result = await useCase.execute({ name: "NonExistent" });

    expect(result).toBeNull();
    expect(mockRepo.findByName).toHaveBeenCalledWith("NonExistent");
    expect(mockRepo.findByName).toHaveBeenCalledTimes(1);
  });
});

