import { describe, it, expect, vi } from "vitest";
import { CreateIngredientUseCase } from "./CreateIngredientUseCase";
import { Ingredient } from "../../../entities/ingredient/ingredient";

describe("CreateIngredientUseCase", () => {
  const mockRepo = {
    findByName: vi.fn(),
    save: vi.fn(),
    findAll: vi.fn(),
    updateByName: vi.fn(),
    deleteByName: vi.fn(),
  };

  it("should create an ingredient", async () => {
    mockRepo.findByName.mockResolvedValue(null);
    mockRepo.save.mockResolvedValue(Ingredient.create("Sugar", 100, "grams"));

    const useCase = new CreateIngredientUseCase(mockRepo);
    const result = await useCase.execute({
      name: "Sugar",
      quantity: 100,
      unit: "grams",
    });

    expect(result).toBeInstanceOf(Ingredient);
    expect(result.name).toBe("Sugar");
    expect(result.quantity).toBe(100);
    expect(result.unit).toBe("grams");
  });

  it("should throw an error if name is empty", async () => {
    const useCase = new CreateIngredientUseCase(mockRepo);

    await expect(
      useCase.execute({ name: "", quantity: 100, unit: "grams" })
    ).rejects.toThrow("Name cannot be empty");
  });

  it("should throw an error if quantity is negative", async () => {
    const useCase = new CreateIngredientUseCase(mockRepo);

    await expect(
      useCase.execute({ name: "Sugar", quantity: -50, unit: "grams" })
    ).rejects.toThrow("Quantity cannot be negative");
  });

  it("should throw an error if unit is empty", async () => {
    const useCase = new CreateIngredientUseCase(mockRepo);

    await expect(
      useCase.execute({ name: "Sugar", quantity: 100, unit: "" })
    ).rejects.toThrow("Unit cannot be empty");
  });

  it("should throw an error if ingredient already exists", async () => {
    mockRepo.findByName.mockResolvedValue(
      Ingredient.create("Sugar", 100, "grams")
    );
    const useCase = new CreateIngredientUseCase(mockRepo);

    await expect(
      useCase.execute({ name: "Sugar", quantity: 100, unit: "grams" })
    ).rejects.toThrow("Ingredient already exists.");
  });
});
