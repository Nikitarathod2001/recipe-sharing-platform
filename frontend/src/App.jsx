import React from 'react';
import {Routes, Route} from "react-router-dom";
import Home from './pages/Home';
import AllRecipes from './pages/AllRecipes';
import RecipeDetails from './pages/RecipeDetails';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <div>
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/all-recipes' element={<AllRecipes/>}/>
        <Route path='/recipe-details/:id' element={<RecipeDetails/>}/>
      </Routes>
    </div>
  )
}

export default App
