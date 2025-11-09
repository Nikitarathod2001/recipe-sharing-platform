import React from "react";
import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { useEffect } from "react";

const RecipeDetails = () => {
  const { id } = useParams();
  const { backendUrl } = useContext(AppContext);
  const navigate = useNavigate();

  const [recipeDetails, setRecipeDetails] = useState({});
  const [isIngredients, setIsIngredients] = useState(true);
  const [isSteps, setIsSteps] = useState(false);

  const getRecipeDetails = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/recipes/get-recipe-details/" + id
      );
      if (data.success) {
        setRecipeDetails(data.recipeDetails);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getRecipeDetails();
  }, []);

  console.log(recipeDetails);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-orange-50 to-white flex justify-center items-center p-6">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-lg flex flex-col md:flex-row gap-10 p-8 transition-all duration-500 hover:shadow-2xl relative">
        {/* All Recipes Button */}
        <button
          onClick={() => navigate("/all-recipes")} 
          className="absolute top-6 right-6 bg-orange-600 text-white py-2 px-5 rounded-full shadow-md hover:bg-orange-700 transition-all duration-300"
        >
          ← All Recipes
        </button>

        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <img
            src={recipeDetails.image}
            alt={recipeDetails.recipename}
            className="w-full h-80 object-cover rounded-2xl shadow-md hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Recipe Details Section */}
        <div className="w-full md:w-1/2 flex flex-col justify-start">
          <h3 className="text-3xl font-semibold text-orange-700 mb-2">
            {recipeDetails.recipename}
          </h3>
          <h4 className="text-gray-600 mb-6">
            Chef:{" "}
            <span className="text-cyan-700 font-medium">
              {recipeDetails.username}
            </span>
          </h4>

          {/* Buttons */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => {
                setIsIngredients(true);
                setIsSteps(false);
              }}
              className={`text-lg font-medium py-2 px-6 rounded-full transition-all duration-300 ${
                isIngredients
                  ? "bg-orange-600 text-white shadow-md scale-105"
                  : "bg-gray-100 text-gray-700 hover:bg-orange-100"
              }`}
            >
              Ingredients
            </button>
            <button
              onClick={() => {
                setIsIngredients(false);
                setIsSteps(true);
              }}
              className={`text-lg font-medium py-2 px-6 rounded-full transition-all duration-300 ${
                isSteps
                  ? "bg-orange-600 text-white shadow-md scale-105"
                  : "bg-gray-100 text-gray-700 hover:bg-orange-100"
              }`}
            >
              Steps
            </button>
          </div>

          {/* Ingredients List */}
          {isIngredients && (
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-5 shadow-sm animate-fadeIn">
              <h5 className="text-lg font-semibold text-orange-800 mb-3">
                Ingredients
              </h5>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                {recipeDetails?.ingredients?.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Steps List */}
          {isSteps && (
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-5 shadow-sm animate-fadeIn">
              <h5 className="text-lg font-semibold text-orange-800 mb-3">
                Steps
              </h5>
              <ol className="list-decimal list-inside text-gray-700 space-y-2">
                {recipeDetails?.steps?.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
