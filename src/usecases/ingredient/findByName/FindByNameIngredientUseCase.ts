import type { IIngredientRepository } from "./../../../repositories/IngredientRepository.js";
import type {
  IFindByNameIngredientRequestDTO,
  IFindByNameIngredientResponseDTO,
} from "./FindByNameIngredientDTO.js";

export class FindByNameIngredient {
  constructor(private IIngredientRepository: IIngredientRepository) {}

  async execute(
    request: IFindByNameIngredientRequestDTO
  ): Promise<IFindByNameIngredientResponseDTO | null> {
    const ingredient = await this.IIngredientRepository.findByName(
      request.name
    );

    if (!ingredient) {
      return null;
    }

    return ingredient;
  }
}
