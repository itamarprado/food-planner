import { Router } from "express";
import { PrismaIngredientRepository } from "./repositories/PrismaIngredientRepository.js";
import { IngredientController } from "./controllers/IngredientController.js";
import { PrismaRecipeRepository } from "./repositories/PrismaRecipeRepository.js";
import { RecipeController } from "./controllers/RecipeController.js";

const router = Router();

const ingredientRepository = new PrismaIngredientRepository();
const ingredientController = new IngredientController(ingredientRepository);

const recipeRepository = new PrismaRecipeRepository();
const recipeController = new RecipeController(recipeRepository);

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

router.delete("/ingredients/:name", (req, res) =>
  ingredientController.delete(req, res)
);

router.post("/recipes", (req, res) => recipeController.create(req, res));

router.get("/recipes", (req, res) => recipeController.getAll(req, res));

router.get("/recipes/:id", (req, res) => recipeController.getById(req, res));

router.put("/recipes/:id", (req, res) => recipeController.update(req, res));

router.delete("/recipes/:id", (req, res) => recipeController.delete(req, res));

export { router };
