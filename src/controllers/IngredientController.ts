import type { Request, Response } from "express";
import type { IIngredientRepository } from "../repositories/IngredientRepository.ts";

// Use Cases
import { CreateIngredientUseCase } from "../usecases/ingredient/create/CreateIngredientUseCase.ts";
import { FindAllIngredients } from "../usecases/ingredient/findAll/FindAllIngredientsUseCase.ts";
import { FindByNameIngredient } from "../usecases/ingredient/findByName/FindByNameIngredientUseCase.ts";
import { UpdateIngredientByName } from "../usecases/ingredient/update/UpdateIngredientByNameUseCase.ts";


export class IngredientController {
  constructor(private ingredientRepository: IIngredientRepository) {}

  // Create and save a new Ingredient
  async create(req: Request, res: Response) {
    const ingredientUseCase = new CreateIngredientUseCase(
      this.ingredientRepository
    );

    try {
      const { name, quantity, unit } = req.body;
      const ingredient = await ingredientUseCase.execute({
        name,
        quantity,
        unit,
      });
      res.status(201).json(ingredient);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  // Return all Ingredients
  async getAll(req: Request, res: Response) {
    const ingredientUseCase = new FindAllIngredients(this.ingredientRepository);

    try {
      const ingredients = await ingredientUseCase.execute();

      res.status(200).json(ingredients);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch ingredients" });
    }
  }

  async getByName(req: Request, res: Response) {
    const ingredientUseCase = new FindByNameIngredient(
      this.ingredientRepository
    );

    try {
      const { name } = req.params;
      if (name) {
        const ingredient = await ingredientUseCase.execute({ name });
        if (ingredient) {
          return res.status(200).json(ingredient);
        } else {
          return res
            .status(404)
            .json({ message: "Ingrediente não encontrado" });
        }
      }
    } catch (error) {
      return res.status(500).json({ message: "Erro ao buscar ingrediente" });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { name } = req.params;
      const { quantity, unit } = req.body;

      if (name === undefined)
        return res.status(400).json({ message: "Name is required" });

      if (unit === "")
        return res.status(400).json({ message: "Unit cannot be empty." });

      const updateIngredientUseCase = new UpdateIngredientByName(
        this.ingredientRepository
      );

      const requestDTO = { name, quantity, unit };

      const updatedIngredient = await updateIngredientUseCase.execute(
        requestDTO
      );
      return res.status(200).json(updatedIngredient);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}
