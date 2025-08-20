import type { IIngredientRepository } from "../../../repositories/IngredientRepository.js";
import type {
  IUpdateIngredientRequestDTO,
  IUpdateIngredientResponseDTO,
  IUpdateIngredientDataDTO,
} from "./UpdateIngredientByNameDTO.ts";

export class UpdateIngredientByName {
  constructor(private IIngredientRepository: IIngredientRepository) {}

  async execute(
    request: IUpdateIngredientRequestDTO
  ): Promise<IUpdateIngredientResponseDTO> {
    const ingredientExists = await this.IIngredientRepository.findByName(
      request.name
    );

    if (!ingredientExists) {
      throw new Error("Ingredient not found, please check the name.");
    }

    const data: IUpdateIngredientDataDTO = {};

    if (request.quantity !== undefined) data.quantity = request.quantity;

    if (request.unit !== undefined) data.unit = request.unit;

    const updateIngredient = await this.IIngredientRepository.updateByName(
      request.name,
      data
    );

    return updateIngredient;
  }
}
