import { describe, it, expect } from "vitest";
import { Recipe } from "./recipe.js";
import type { IngredientDTO } from "../../usecases/recipe/create/CreateRecipeDTO.js";

describe("Recipe Entity", () => {
  const validIngredient: IngredientDTO = {
    name: "flour",
    quantity: 200,
    unit: "grams",
  };

  it("should create a recipe with all fields", () => {
    const recipe = Recipe.create(
      "Test Recipe",
      "A test description",
      "Test instructions",
      30,
      4,
      [validIngredient]
    );

    expect(recipe).toBeInstanceOf(Recipe);
    expect(recipe.name).toBe("Test Recipe");
    expect(recipe.description).toBe("A test description");
    expect(recipe.howToPrepare).toBe("Test instructions");
    expect(recipe.timeToPrepare).toBe(30);
    expect(recipe.portions).toBe(4);
    expect(recipe.ingredients).toHaveLength(1);
    expect(recipe.ingredients[0]).toEqual(validIngredient);
    expect(recipe.createdAt).toBeInstanceOf(Date);
    expect(recipe.updatedAt).toBeInstanceOf(Date);
  });

  it("should create a recipe with empty ingredients array", () => {
    const recipe = Recipe.create(
      "Test Recipe",
      "A test description",
      "Test instructions",
      30,
      4,
      []
    );

    expect(recipe).toBeInstanceOf(Recipe);
    expect(recipe.ingredients).toHaveLength(0);
  });

  it("should create a recipe using Recipe.with() factory method", () => {
    const recipe = Recipe.with({
      id: "test-id",
      name: "Test Recipe",
      description: "A test description",
      howToPrepare: "Test instructions",
      timeToPrepare: 30,
      portions: 4,
      ingredients: [validIngredient],
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    expect(recipe).toBeInstanceOf(Recipe);
    expect(recipe.id).toBe("test-id");
    expect(recipe.name).toBe("Test Recipe");
    expect(recipe.ingredients).toHaveLength(1);
  });

  it("should create a recipe using Recipe.with() with undefined ingredients (defaults to empty array)", () => {
    const recipe = Recipe.with({
      id: "test-id",
      name: "Test Recipe",
      description: "A test description",
      howToPrepare: "Test instructions",
      timeToPrepare: 30,
      portions: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    expect(recipe).toBeInstanceOf(Recipe);
    expect(recipe.ingredients).toHaveLength(0);
  });

  it("should create a recipe with zero timeToPrepare and portions (edge case)", () => {
    const recipe = Recipe.create(
      "Test Recipe",
      "A test description",
      "Test instructions",
      0,
      0,
      []
    );

    expect(recipe).toBeInstanceOf(Recipe);
    expect(recipe.timeToPrepare).toBe(0);
    expect(recipe.portions).toBe(0);
  });

  it("should throw an error if name is empty", () => {
    expect(() => {
      Recipe.create("", "A test description", "Test instructions", 30, 4, []);
    }).toThrow("Name cannot be empty");
  });

  it("should throw an error if timeToPrepare is negative", () => {
    expect(() => {
      Recipe.create(
        "Test Recipe",
        "A test description",
        "Test instructions",
        -10,
        4,
        []
      );
    }).toThrow("Time to prepare cannot be negative");
  });

  it("should throw an error if portions is negative", () => {
    expect(() => {
      Recipe.create(
        "Test Recipe",
        "A test description",
        "Test instructions",
        30,
        -5,
        []
      );
    }).toThrow("Portions cannot be negative");
  });
});

