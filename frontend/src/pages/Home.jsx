import React, { useContext, useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Home = () => {
  const navigate = useNavigate();
  const { backendUrl } = useContext(AppContext);

  const [userName, setUserName] = useState();
  const [recipeName, setRecipeName] = useState();
  const [ingredient, setIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [step, setStep] = useState("");
  const [steps, setSteps] = useState([]);
  const [image, setImage] = useState(false);

  const [active, setActive] = useState("new-recipe");

  const addIngredients = () => {
    if (ingredient.trim() !== "") {
      setIngredients((prev) => [...prev, ingredient]);
      setIngredient("");
    }
  };

  const addSteps = () => {
    if (step.trim() !== "") {
      setSteps((prev) => [...prev, step]);
      setStep("");
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("username", userName);
      formData.append("recipename", recipeName);
      formData.append("ingredients", JSON.stringify(ingredients));
      formData.append("steps", JSON.stringify(steps));
      formData.append("image", image);

      const { data } = await axios.post(
        backendUrl + "/api/recipes/add-recipe",
        formData
      );

      if (data.success) {
        toast.success(data.message);
        navigate("/all-recipes", { replace: true });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-orange-50 to-white flex justify-center items-start py-12 px-6">
      <form
        onSubmit={onSubmitHandler}
        className="w-full sm:w-[80%] md:w-[50%] lg:w-[40%] bg-white shadow-lg rounded-3xl p-8 flex flex-col gap-8 transition-all duration-500 hover:shadow-2xl animate-fadeIn"
      >
        {/* Header Tabs */}
        <div className="flex justify-center items-center gap-6 border-b pb-4">
          <h1
            onClick={() => setActive("new-recipe")}
            className={`text-3xl font-semibold cursor-pointer transition-all duration-300 ${
              active === "new-recipe"
                ? "text-orange-600 border-b-4 border-orange-500 pb-1"
                : "text-gray-500 hover:text-orange-500"
            }`}
          >
            New Recipe
          </h1>
          <button
            type="button"
            onClick={() => {
              navigate("/all-recipes", { replace: true });
              setActive("all-recipes");
            }}
            className={`text-3xl font-semibold cursor-pointer transition-all duration-300 ${
              active === "all-recipes"
                ? "text-orange-600 border-b-4 border-orange-500 pb-1"
                : "text-gray-500 hover:text-orange-500"
            }`}
          >
            All Recipes
          </button>
        </div>

        {/* Form Fields */}
        <div className="flex flex-col gap-6">
          {/* Username */}
          <div className="flex flex-col gap-2">
            <label className="text-lg font-medium text-gray-700">
              User Name
            </label>
            <input
              type="text"
              placeholder="Enter your name..."
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              className="border border-gray-300 rounded-full py-2 px-4 text-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-orange-400 outline-none transition-all duration-300"
            />
          </div>

          {/* Recipe Name */}
          <div className="flex flex-col gap-2">
            <label className="text-lg font-medium text-gray-700">
              Recipe Name
            </label>
            <input
              type="text"
              placeholder="Enter recipe name..."
              value={recipeName}
              onChange={(e) => setRecipeName(e.target.value)}
              required
              className="border border-gray-300 rounded-full py-2 px-4 text-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-orange-400 outline-none transition-all duration-300"
            />
          </div>

          {/* Ingredients */}
          <div className="flex flex-col gap-2">
            <label className="text-lg font-medium text-gray-700">
              Ingredients
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter ingredients one by one..."
                value={ingredient}
                onChange={(e) => setIngredient(e.target.value)}
                className="border border-gray-300 rounded-full py-2 px-4 text-gray-700 flex-1 placeholder:text-gray-400 focus:ring-2 focus:ring-orange-400 outline-none transition-all duration-300"
              />
              <button
                type="button"
                onClick={addIngredients}
                className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 rounded-full transition-all duration-300 shadow-sm"
              >
                Add
              </button>
            </div>
          </div>

          {/* Steps */}
          <div className="flex flex-col gap-2">
            <label className="text-lg font-medium text-gray-700">
              Steps
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter steps one by one..."
                value={step}
                onChange={(e) => setStep(e.target.value)}
                className="border border-gray-300 rounded-full py-2 px-4 text-gray-700 flex-1 placeholder:text-gray-400 focus:ring-2 focus:ring-orange-400 outline-none transition-all duration-300"
              />
              <button
                type="button"
                onClick={addSteps}
                className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 rounded-full transition-all duration-300 shadow-sm"
              >
                Add
              </button>
            </div>
          </div>

          {/* Recipe Image */}
          <div className="flex flex-col gap-2">
            <label className="text-lg font-medium text-gray-700">
              Recipe Image
            </label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              required
              className="border border-gray-300 rounded-full py-2 px-3 text-gray-700 file:bg-orange-500 file:text-white file:rounded-full file:px-4 file:py-1 file:border-none file:cursor-pointer focus:ring-2 focus:ring-orange-400 outline-none transition-all duration-300"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-orange-600 text-white rounded-full font-medium text-lg hover:bg-orange-700 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Add Recipe
          </button>
        </div>
      </form>
    </div>
  );
};

export default Home;
