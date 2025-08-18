export interface IUpdateIngredientRequestDTO {
  name: string;
  quantity?: number;
  unit?: string;
}

export interface IUpdateIngredientResponseDTO {
  name: string;
  quantity: number;
  unit: string;
  updatedAt: Date;
}

export type IUpdateIngredientDataDTO = {
  quantity?: number;
  unit?: string;
};
