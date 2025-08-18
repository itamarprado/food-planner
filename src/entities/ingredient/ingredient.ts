export type IngredientProps = {
  name: string;
  quantity: number;
  unit: string;
  createdAt: Date;
  updatedAt: Date;
};

export class Ingredient {
  constructor(private props: IngredientProps) {
    this.validate();
  }

  public static create(name: string, quantity: number, unit: string) {
    return new Ingredient({
      name,
      quantity,
      unit,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  public static with(props: IngredientProps) {
    return new Ingredient(props);
  }

  public toJSON() {
    return {
      name: this.name,
      quantity: this.quantity,
      unit: this.unit,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  // Basic validation logic to constructor
  private validate() {
    if (this.name === "") {
      throw new Error("Name cannot be empty");
    }

    if (this.quantity < 0) {
      throw new Error("Quantity cannot be negative");
    }

    if (this.unit === "") {
      throw new Error("Unit cannot be empty");
    }
  }

  public increaseQuantity(amount: number) {
    if (amount < 0) {
      throw new Error("Amount to increase cannot be negative");
    }

    this.props.quantity += amount;
    this.props.updatedAt = new Date();
  }

  public decreaseQuantity(amount: number) {
    if (amount < 0) {
      throw new Error("Amount to decrease cannot be negative");
    }

    if (this.props.quantity - amount < 0) {
      throw new Error("Quantity cannot be decreased below zero");
    }

    this.props.quantity -= amount;
    this.props.updatedAt = new Date();
  }

  public updateName(newName: string) {
    if (newName === "") {
      throw new Error("Name cannot be empty");
    }

    this.props.name = newName;
    this.props.updatedAt = new Date();
  }

  public updateUnit(newunit: string) {
    if (newunit === "") {
      throw new Error("Unit cannot be empty");
    }

    this.props.unit = newunit;
    this.props.updatedAt = new Date();
  }

  get name(): string {
    return this.props.name;
  }

  get quantity(): number {
    return this.props.quantity;
  }

  get unit(): string {
    return this.props.unit;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
