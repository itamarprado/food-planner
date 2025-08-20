import type { IIngredientRepository } from "./../../../repositories/IngredientRepository.js";
import { describe, expect, it } from "vitest";
import { CreateIngredientUseCase } from "./CreateIngredientUseCase.js";

describe("Create Ingredient", () => {
  it("should create a new ingredient", () => {
    const IIngredientRepository = {} as IIngredientRepository;
    const newIngredient = new CreateIngredientUseCase(IIngredientRepository);
    expect(newIngredient).toBeInstanceOf(CreateIngredientUseCase);
  });
});
