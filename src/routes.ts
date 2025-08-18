import { Router } from "express";
import { PrismaIngredientRepository } from "./repositories/PrismaIngredientRepository.ts";
import { IngredientController } from "./controllers/IngredientController.ts";

const router = Router();

const ingredientRepository = new PrismaIngredientRepository();
const ingredientController = new IngredientController(ingredientRepository);

router.post("/ingredients", (req, res) =>
  ingredientController.create(req, res)
);

router.get("/ingredients", (req, res) => ingredientController.getAll(req, res));

router.get("/ingredients/:name", (req, res) =>
  ingredientController.getByName(req, res)
);

router.put("/ingredients/:name", (req, res) =>
  ingredientController.update(req, res)
);

export { router };
