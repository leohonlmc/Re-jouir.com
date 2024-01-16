import React, { useState, createContext } from "react";

export const AppStateContext = createContext();

const AppStateProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);

  return (
    <AppStateContext.Provider value={{ loading, setLoading }}>
      {children}
    </AppStateContext.Provider>
  );
};

export default AppStateProvider;
