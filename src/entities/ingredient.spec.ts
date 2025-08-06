import { expect, test } from "vitest";
import { Ingredient } from "./ingredient";

test("create an ingradient", () => {
  const ingredient = new Ingredient("Sugar", 100, "grams");

  expect(ingredient).toBeInstanceOf(Ingredient);
  expect(ingredient.name).toBe("Sugar");
  expect(ingredient.quantity).toBe(100);
  expect(ingredient.unity).toBe("grams");
});
