import React from "react";
import { useNavigate } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();

  return (
    <div className="border border-[#f7cbc4] bg-white rounded-[15px] py-3 px-5 flex flex-col gap-[10px] shadow-md shadow-zinc-400 hover:scale-105 transition-transform duration-300 overflow-hidden">
      <div className="w-full h-[180px] mb-[15px] overflow-hidden rounded-[10px]">
        <img
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
          src={recipe.image}
          alt={recipe.recipename}
        />
      </div>

      <h2 className="text-[#FF6347] font-semibold text-[20px] truncate">
        {recipe.recipename}
      </h2>

      <p className="text-cyan-700 font-medium">
        <span className="text-black font-medium">Chef:</span> {recipe.username}
      </p>

      <button
        onClick={() => navigate(`/recipe-details/${recipe._id}`)}
        className="bg-[#FF7F50] hover:bg-[#E5533D] text-white mt-[10px] py-2 rounded-[8px] font-medium transition-colors duration-300 cursor-pointer"
      >
        Recipe Details
      </button>
    </div>
  );
};

export default RecipeCard;
