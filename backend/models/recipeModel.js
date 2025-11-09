import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
  username: {type: String, required: true},
  recipename: {type: String, required: true},
  ingredients: {type: Array, required: true},
  steps: {type: Array, required: true},
  image: {type: String, required: true}
});

const recipeModel = mongoose.models.recipes || new mongoose.model("recipes", recipeSchema);

export default recipeModel;