import { createContext, useState } from "react";


export const AppContext = createContext();

const AppContextProvider = (props) => {

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [allRecipes, setAllRecipes] = useState([]);

  const value = {
    backendUrl,
    allRecipes, setAllRecipes
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );

};

export default AppContextProvider;