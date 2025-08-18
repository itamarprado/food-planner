import { PrismaClient } from "../generated/prisma/index.js";
import type { IIngredientRepository } from "./IngredientRepository.ts";
import { Ingredient } from "../entities/ingredient/ingredient.ts";
import type { IUpdateIngredientDataDTO } from "../usecases/ingredient/update/UpdateIngredientByNameDTO.ts";

const prisma = new PrismaClient();

export class PrismaIngredientRepository implements IIngredientRepository {
  async findByName(name: string): Promise<Ingredient | null> {
    const ingredient = await prisma.ingredient.findUnique({ where: { name } });
    if (!ingredient) return null;
    return Ingredient.with(ingredient);
  }

  async findAll(): Promise<Ingredient[]> {
    const ingredients = await prisma.ingredient.findMany();
    return ingredients.map((i) => Ingredient.with(i));
  }

  async save(ingredient: Ingredient): Promise<void> {
    await prisma.ingredient.create({
      data: {
        name: ingredient.name,
        quantity: ingredient.quantity,
        unit: ingredient.unit,
      },
    });
  }

  async updateByName(
    name: string,
    data: IUpdateIngredientDataDTO
  ): Promise<Ingredient> {
    return Ingredient.with(
      await prisma.ingredient.update({
        where: { name },
        data,
      })
    );
  }


}
