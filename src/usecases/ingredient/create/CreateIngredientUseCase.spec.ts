import type { IIngredientRepository } from "./../../../repositories/IngredientRepository.ts";
import { describe, expect, it } from "vitest";
import { CreateIngredientUseCase } from "./CreateIngredientUseCase.ts";

describe("Create Ingredient", () => {
  it("should create a new ingredient", () => {
    const IIngredientRepository = {} as IIngredientRepository;
    const newIngredient = new CreateIngredientUseCase(IIngredientRepository);
    expect(newIngredient).toBeInstanceOf(CreateIngredientUseCase);
  });
});
