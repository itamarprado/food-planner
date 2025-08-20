import type { IIngredientRepository } from "../../../repositories/IngredientRepository.js";
import type { IFindAllIngredientsResponseDTO } from "./FindAllIngredientsDTO.js";

export class FindAllIngredients {
  constructor(private IIngredientRepository: IIngredientRepository) {}

  async execute(): Promise<IFindAllIngredientsResponseDTO[]> {
    const ingredientsFound = await this.IIngredientRepository.findAll();

    if (ingredientsFound.length === 0) {
      return [];
    }

    return ingredientsFound.map((i) => ({
      name: i.name,
      quantity: i.quantity,
      unit: i.unit,
      createdAt: i.createdAt,
    }));
  }
}
