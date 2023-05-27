import { createContext, useState } from "react";
import React from "react";

const FiltersContext = createContext({});

export const FiltersProvider = ({ children }) => {
  const [filters, setFilters] = useState({ minPrice: 0, maxPrice: 5000 });

  return (
    <FiltersContext.Provider value={{ filters, setFilters }}>
      {children}
    </FiltersContext.Provider>
  );
};

export default FiltersContext;
