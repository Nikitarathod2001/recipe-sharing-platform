import {v2 as cloudinary} from "cloudinary";
import recipeModel from "../models/recipeModel.js";

// --- API to store recipe data into database ---
const addRecipe = async (req, res) => {

  try {

    const {username, recipename, ingredients, steps} = req.body;
    const imageFile = req.file;

    if(!username || !recipename || !ingredients || !steps || !imageFile) {
      return res.json({
        success: false,
        message: "Data Missing"
      });
    }

    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type: "image"});
    const imageUrl = imageUpload.secure_url;

    const uploadRecipeData = {
      username, recipename,
      ingredients: JSON.parse(ingredients),
      steps: JSON.parse(steps),
      image: imageUrl
    };

    const newRecipe = await recipeModel(uploadRecipeData);
    await newRecipe.save();

    return res.json({
      success: true,
      message: "Recipe added!"
    });
    
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: error.message
    });
  }

};

// --- API to get all recipes ---
const getAllRecipes = async (req, res) => {
  try {

    const allRecipes = await recipeModel.find();

    if(allRecipes.length === 0) {
      return res.json({
        success: false,
        message: "Please add recipe..."
      });
    }

    res.json({
      success: true,
      allRecipes
    });
    
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message
    });
  }
};

// --- API to get recipe details ---
const getRecipeDetails = async (req, res) => {
  try {

    const {id} = req.params;

    const recipeDetails = await recipeModel.findById(id);

    if(!recipeDetails) {
      return res.json({
        success: false,
        message: "Recipe Not Found!"
      });
    }

    res.json({
      success: true,
      recipeDetails
    });
    
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message
    });
  }
};

export {addRecipe, getAllRecipes, getRecipeDetails};