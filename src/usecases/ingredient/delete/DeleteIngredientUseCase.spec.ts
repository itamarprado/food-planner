import { describe, it, expect, vi, beforeEach } from "vitest";
import { DeleteIngredientUseCase } from "./DeleteIngredientUseCase.js";
import { Ingredient } from "../../../entities/ingredient/ingredient.js";

describe("DeleteIngredientUseCase", () => {
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

  it("should delete ingredient successfully when found", async () => {
    const ingredientToDelete = Ingredient.create("Sugar", 100, "grams");
    mockRepo.findByName.mockResolvedValue(ingredientToDelete);
    mockRepo.deleteByName.mockResolvedValue(undefined);

    const useCase = new DeleteIngredientUseCase(mockRepo);
    await useCase.execute("Sugar");

    expect(mockRepo.findByName).toHaveBeenCalledWith("Sugar");
    expect(mockRepo.findByName).toHaveBeenCalledTimes(1);
    expect(mockRepo.deleteByName).toHaveBeenCalledWith("Sugar");
    expect(mockRepo.deleteByName).toHaveBeenCalledTimes(1);
  });

  it("should throw an error if ingredient not found", async () => {
    mockRepo.findByName.mockResolvedValue(null);

    const useCase = new DeleteIngredientUseCase(mockRepo);

    await expect(useCase.execute("NonExistent")).rejects.toThrow(
      "Ingredient not found."
    );
    expect(mockRepo.findByName).toHaveBeenCalledWith("NonExistent");
    expect(mockRepo.deleteByName).not.toHaveBeenCalled();
  });
});

