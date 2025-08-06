export class Ingredient {
  private _name: string;
  private _quantity: number;
  private _unity: string;
  private _createdAt: Date;
  private _updatedAt: Date;

  private touch() {
    this._updatedAt = new Date();
  }

  get name(): string {
    return this._name;
  }

  get quantity(): number {
    return this._quantity;
  }

  get unity(): string {
    return this._unity;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  set name(value: string) {
    this._name = value;
    this.touch();
  }

  set quantity(value: number) {
    this._quantity = value;
    this.touch();
  }

  set unity(value: string) {
    this._unity = value;
    this.touch();
  }

  constructor(name: string, quantity: number, unity: string) {
    this._name = name;
    this._quantity = quantity;
    this._unity = unity;
    this._createdAt = new Date();
    this._updatedAt = new Date();
  }
}
