import type { Request, Response } from "express";
import type { IRecipeRepository } from "../repositories/RecipeRepository.js";

// Use Cases
import { CreateRecipeUseCase } from "../usecases/recipe/create/CreateRecipeUseCase.js";
import { FindAllRecipes } from "../usecases/recipe/findAll/FindAllRecipesUseCase.js";
import { FindByIdRecipeUseCase } from "../usecases/recipe/findById/FindByIdRecipeUseCase.js";
import { DeleteRecipeUseCase } from "../usecases/recipe/delete/DeleteRecipeUseCase.js";
import { UpdateRecipeByIdUseCase } from "../usecases/recipe/update/UpdateRecipeByIdUseCase.js";

export class RecipeController {
  constructor(private recipeRepository: IRecipeRepository) {}
  // Create and save a new Recipe
  async create(req: Request, res: Response) {
    const recipeUseCase = new CreateRecipeUseCase(this.recipeRepository);
    try {
      const {
        name,
        description,
        howToPrepare,
        timeToPrepare,
        portions,
        ingredients,
      } = req.body;
      const recipe = await recipeUseCase.execute({
        name,
        description,
        howToPrepare,
        timeToPrepare,
        portions,
        ingredients,
      });
      res.status(201).json(recipe);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async getAll(req: Request, res: Response) {
    const findAllRecipesUseCase = new FindAllRecipes(this.recipeRepository);

    try {
      const recipes = await findAllRecipesUseCase.execute();

      res.status(200).json(recipes);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch recipes" });
    }
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Recipe ID is required" });
    }

    const findByIdRecipeUseCase = new FindByIdRecipeUseCase(
      this.recipeRepository
    );

    try {
      const recipe = await findByIdRecipeUseCase.execute({ id });

      if (!recipe) {
        return res.status(404).json({ error: "Recipe not found" });
      }

      res.status(200).json(recipe);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch recipe" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ error: "Recipe ID is required" });
      }

      const updateRecipeUseCase = new UpdateRecipeByIdUseCase(
        this.recipeRepository
      );

      const updatedRecipe = await updateRecipeUseCase.execute({
        id,
        ...req.body,
      });

      res.status(200).json(updatedRecipe);
    } catch (error) {
      const errorMessage = (error as Error).message;
      if (errorMessage === "Recipe not found") {
        return res.status(404).json({ error: errorMessage });
      }
      res.status(400).json({ error: errorMessage });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ error: "Recipe ID is required" });
      }

      const deleteRecipeUseCase = new DeleteRecipeUseCase(
        this.recipeRepository
      );

      await deleteRecipeUseCase.execute(id);

      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ error: "Failed to delete recipe" });
    }
  }
}
