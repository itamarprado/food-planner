import type { IngredientDTO } from "../../usecases/recipe/create/CreateRecipeDTO.js";
export type RecipeProps = {
  id?: string;
  name: string;
  description: string;
  howToPrepare: string;
  timeToPrepare: number; // in minutes
  portions: number;
  ingredients: IngredientDTO[];
  createdAt: Date;
  updatedAt: Date;
};

export class Recipe {
  constructor(private props: RecipeProps) {
    this.validate();
  }

  public static create(
    name: string,
    description: string,
    howToPrepare: string,
    timeToPrepare: number,
    portions: number,
    ingredients: IngredientDTO[]
  ) {
    return new Recipe({
      name,
      description,
      howToPrepare,
      timeToPrepare,
      portions,
      ingredients,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  public static with(
    props: Omit<RecipeProps, "ingredients"> & { ingredients?: IngredientDTO[] }
  ) {
    return new Recipe({ ...props, ingredients: props.ingredients ?? [] });
  }

  private validate() {
    if (this.name === "") {
      throw new Error("Name cannot be empty");
    }

    if (this.timeToPrepare < 0) {
      throw new Error("Time to prepare cannot be negative");
    }

    if (this.portions < 0) {
      throw new Error("Portions cannot be negative");
    }
  }

  get id(): string | undefined {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get description(): string {
    return this.props.description;
  }

  get howToPrepare(): string {
    return this.props.howToPrepare;
  }

  get timeToPrepare(): number {
    return this.props.timeToPrepare;
  }

  get portions(): number {
    return this.props.portions;
  }

  get ingredients(): IngredientDTO[] {
    return this.props.ingredients;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
