import { Ingredient } from "../../../entities/ingredient/ingredient.js";
import type { IIngredientRepository } from "../../../repositories/IngredientRepository.js";
import type {
  ICreateIngredientRequestDTO,
  ICreateIngredientResponseDTO,
} from "./CreateIngredientDTO.ts";
export class CreateIngredientUseCase {
  constructor(private IIngredientRepository: IIngredientRepository) {}

  async execute({
    name,
    quantity,
    unit,
  }: ICreateIngredientRequestDTO): Promise<ICreateIngredientResponseDTO> {
    const ingredientAlreadyExists = await this.IIngredientRepository.findByName(
      name
    );

    if (ingredientAlreadyExists) {
      throw new Error("Ingredient already exists.");
    }

    const newIngredient = Ingredient.create(name, quantity, unit);

    await this.IIngredientRepository.save(newIngredient);

    return newIngredient;
  }
}
