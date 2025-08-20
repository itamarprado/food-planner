import { describe, expect, test, it } from "vitest";
import { Ingredient } from "./ingredient.js";

describe("Ingredient Entity", () => {
  it("should create an ingredient", () => {
    const ingredient = Ingredient.create("Sugar", 100, "grams");

    expect(ingredient).toBeInstanceOf(Ingredient);
    expect(ingredient.name).toBe("Sugar");
    expect(ingredient.quantity).toBe(100);
    expect(ingredient.unit).toBe("grams");
  });

  it("should throw an error if name is empty", () => {
    expect(() => {
      Ingredient.create("", 100, "grams");
    }).toThrow("Name cannot be empty");
  });

  it("should throw an error if quantity is negative", () => {
    expect(() => {
      Ingredient.create("Sugar", -50, "grams");
    }).toThrow("Quantity cannot be negative");
  });

  it("should throw an error if unit is empty", () => {
    expect(() => {
      Ingredient.create("Sugar", 100, "");
    }).toThrow("Unit cannot be empty");
  });

  it("should increase quantity correctly", () => {
    const ingredient = Ingredient.create("Sugar", 100, "grams");
    ingredient.increaseQuantity(50);

    expect(ingredient.quantity).toBe(150);
  });

  it("should throw an error when increasing quantity with a negative amount", () => {
    const ingredient = Ingredient.create("Sugar", 100, "grams");

    expect(() => {
      ingredient.increaseQuantity(-10);
    }).toThrow("Amount to increase cannot be negative");
  });

  it("should decrease quantity correctly", () => {
    const ingredient = Ingredient.create("Sugar", 100, "grams");
    ingredient.decreaseQuantity(30);

    expect(ingredient.quantity).toBe(70);
  });

  it("should throw an error when decreasing quantity with a negative amount", () => {
    const ingredient = Ingredient.create("Sugar", 100, "grams");

    expect(() => {
      ingredient.decreaseQuantity(-10);
    }).toThrow("Amount to decrease cannot be negative");
  });

  it("should throw an error when decreasing quantity below zero", () => {
    const ingredient = Ingredient.create("Sugar", 100, "grams");

    expect(() => {
      ingredient.decreaseQuantity(150);
    }).toThrow("Quantity cannot be decreased below zero");
  });
});
