import type { IIngredientRepository } from "../../../repositories/IngredientRepository";

export class DeleteIngredientUseCase {
  constructor(private ingredientRepository: IIngredientRepository) {}

  async execute(name: string): Promise<void> {
    const ingredientToBeDeleted = await this.ingredientRepository.findByName(
      name
    );

    if (!ingredientToBeDeleted) {
      throw new Error("Ingredient not found.");
    }

    await this.ingredientRepository.deleteByName(name);
  }
}
