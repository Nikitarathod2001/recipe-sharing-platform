import React from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import RecipeCard from "../component/RecipeCard";
import { useNavigate } from "react-router-dom";

const AllRecipes = () => {
  const { backendUrl } = useContext(AppContext);

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const [isSearch, setIsSearch] = useState(false);
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  const [searchRecipeName, setSearchRecipeName] = useState("");
  const [title, setTitle] = useState("");

  const navigate = useNavigate();

  const getAllRecipes = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(backendUrl + "/api/recipes/get-recipes");

      if (data.success) {
        setRecipes(data.allRecipes);
        setLoading(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getSearchedRecipes = () => {
    setSearchedRecipes([]);
    setTitle("");

    const tempData = recipes.filter((recipe) => {
      return recipe.recipename
        .toLowerCase()
        .includes(searchRecipeName.toLowerCase());
    });

    setSearchedRecipes(tempData);
    setTitle(searchRecipeName);
  };

  useEffect(() => {
    getAllRecipes();
  }, []);

  console.log(searchedRecipes);

  return (
    recipes.length > 0 && (
      <div className="w-full min-h-screen bg-gradient-to-b from-orange-50 to-white py-10 px-6 md:px-16">
        {/* Loading State */}
        {loading && (
          <p className="text-center text-orange-600 font-medium text-lg animate-pulse">
            Loading Recipes...
          </p>
        )}

        <div className="flex flex-col gap-10 animate-fadeIn transition-all duration-500">
          {/* Top Action Buttons */}
          <div className="flex flex-wrap justify-center items-center gap-6">
            {/* Add Recipe Button */}
            <button
              onClick={() => navigate("/")}
              className="bg-orange-500 text-white py-3 px-8 rounded-full shadow-md hover:bg-orange-600 transition-all duration-300"
            >
              Add New Recipe
            </button>

            {/* Search / All Recipes Toggle Button */}
            {isSearch ? (
              <button
                onClick={() => {
                  navigate("/all-recipes");
                  setIsSearch(false);
                  setTitle("");
                }}
                className="bg-white text-orange-600 border border-orange-500 py-3 px-8 rounded-full shadow-md hover:bg-orange-50 hover:text-orange-700 transition-all duration-300"
              >
                ← All Recipes
              </button>
            ) : (
              <button
                onClick={() => setIsSearch(true)}
                className="bg-white text-orange-600 border border-orange-500 py-3 px-8 rounded-full shadow-md hover:bg-orange-50 hover:text-orange-700 transition-all duration-300"
              >
                Search Recipe
              </button>
            )}
          </div>

          {/* Search Input */}
          {isSearch && (
            <div className="flex flex-wrap justify-center items-center gap-3">
              <input
                type="text"
                placeholder="Search for a recipe..."
                value={searchRecipeName}
                onChange={(e) => setSearchRecipeName(e.target.value)}
                className="border border-gray-300 rounded-full w-[90%] sm:w-[400px] py-3 px-5 placeholder:text-gray-500 text-gray-700 shadow-sm focus:ring-2 focus:ring-orange-400 outline-none transition duration-300"
              />
              <button
                onClick={getSearchedRecipes}
                className="bg-orange-500 text-white py-3 px-6 rounded-full shadow-md hover:bg-orange-600 transition-all duration-300"
              >
                Search
              </button>
            </div>
          )}

          {/* Recipe Cards Grid */}
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-4 md:px-10 py-6">
            {title.trim() === "" &&
              recipes.map((recipe) => (
                <RecipeCard key={recipe._id} recipe={recipe} />
              ))}

            {title.trim() !== "" &&
              searchedRecipes.map((recipe) => (
                <RecipeCard key={recipe._id} recipe={recipe} />
              ))}
          </div>
        </div>
      </div>
    )
  );
};

export default AllRecipes;
