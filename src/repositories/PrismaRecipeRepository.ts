import type {
  IRecipeRepository,
  UpdateRecipeData,
} from "./RecipeRepository.js";
import { PrismaClient } from "../generated/prisma/index.js";
import { Recipe } from "../entities/recipe/recipe.js";

const prisma = new PrismaClient();

export class PrismaRecipeRepository implements IRecipeRepository {
  async findByName(name: string): Promise<Recipe | null> {
    const recipe = await prisma.recipe.findUnique({ where: { name } });
    if (!recipe) return null;
    return Recipe.with(recipe);
  }

  async findById(id: string): Promise<Recipe | null> {
    const data = await prisma.recipe.findUnique({
      where: { id },
      include: {
        ingredients: {
          include: {
            ingredient: true,
          },
        },
      },
    });

    if (!data) return null;

    return new Recipe({
      id: data.id,
      name: data.name,
      description: data.description,
      howToPrepare: data.howToPrepare,
      timeToPrepare: data.timeToPrepare,
      portions: data.portions,
      ingredients: data.ingredients.map((ing) => ({
        name: ing.ingredient.name,
        unit: ing.unit,
        quantity: ing.amount,
      })),
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  }

  async findAll(): Promise<Recipe[]> {
    const recipes = await prisma.recipe.findMany();
    return recipes.map((r) => Recipe.with(r));
  }

  async save(recipe: Recipe): Promise<void> {
    await prisma.recipe.create({
      data: {
        name: recipe.name,
        description: recipe.description,
        howToPrepare: recipe.howToPrepare,
        timeToPrepare: recipe.timeToPrepare,
        portions: recipe.portions,
        ingredients: {
          create: recipe.ingredients?.map((ing) => ({
            amount: ing.quantity,
            unit: ing.unit,
            ingredient: {
              connectOrCreate: {
                where: { name: ing.name.toLowerCase() },
                create: {
                  name: ing.name.toLowerCase(),
                  quantity: 0,
                  unit: ing.unit,
                },
              },
            },
          })),
        },
      },
    });
  }

  async updateById(id: string, data: UpdateRecipeData): Promise<Recipe> {
    const updateData: {
      name?: string;
      description?: string;
      howToPrepare?: string;
      timeToPrepare?: number;
      portions?: number;
    } = {};

    if (data.name !== undefined) updateData.name = data.name;
    if (data.description !== undefined)
      updateData.description = data.description;
    if (data.howToPrepare !== undefined)
      updateData.howToPrepare = data.howToPrepare;
    if (data.timeToPrepare !== undefined)
      updateData.timeToPrepare = data.timeToPrepare;
    if (data.portions !== undefined) updateData.portions = data.portions;

    const ingredientsUpdate =
      data.ingredients !== undefined
        ? {
            deleteMany: {},
            create: data.ingredients.map((ing) => ({
              amount: ing.quantity,
              unit: ing.unit,
              ingredient: {
                connectOrCreate: {
                  where: { name: ing.name.toLowerCase() },
                  create: {
                    name: ing.name.toLowerCase(),
                    quantity: 0,
                    unit: ing.unit,
                  },
                },
              },
            })),
          }
        : undefined;

    const updated = await prisma.recipe.update({
      where: { id },
      data: {
        ...updateData,
        ...(ingredientsUpdate && { ingredients: ingredientsUpdate }),
      },
      include: {
        ingredients: {
          include: {
            ingredient: true,
          },
        },
      },
    });

    return new Recipe({
      id: updated.id,
      name: updated.name,
      description: updated.description,
      howToPrepare: updated.howToPrepare,
      timeToPrepare: updated.timeToPrepare,
      portions: updated.portions,
      ingredients: updated.ingredients.map((ing) => ({
        name: ing.ingredient.name,
        unit: ing.unit,
        quantity: ing.amount,
      })),
      createdAt: updated.createdAt,
      updatedAt: updated.updatedAt,
    });
  }

  async deleteById(id: string): Promise<void> {
    await prisma.recipe.delete({ where: { id } });
  }
}
