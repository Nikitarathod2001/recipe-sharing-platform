import express from "express";
import uploadImage from "../middlewares/multer.js";
import { addRecipe, getAllRecipes, getRecipeDetails } from "../controllers/recipeControllers.js";

const recipeRouter = express.Router();

recipeRouter.post("/add-recipe", uploadImage.single("image"), addRecipe);
recipeRouter.get("/get-recipes", getAllRecipes);
recipeRouter.get("/get-recipe-details/:id", getRecipeDetails);

export default recipeRouter;