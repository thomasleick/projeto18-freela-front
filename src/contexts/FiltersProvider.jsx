import { createContext, useEffect, useState } from "react";
import React from "react";
import { axiosPrivate } from "../api/axios";

const FiltersContext = createContext({});

export const FiltersProvider = ({ children }) => {
  const [filters, setFilters] = useState({ minPrice: 0, maxPrice: 5000 });
  const [cities, setCities] = useState([]);
  const [airlines, setAirlines] = useState([]);
  const [menu, setMenu] = useState("flights");

  useEffect(() => {
    const getFilters = async () => {
      const cities = await axiosPrivate.get("/cities");
      setCities(cities.data);
      const airlines = await axiosPrivate.get("/airlines");
      setAirlines(airlines.data);
    };
    getFilters();
  }, []);

  return (
    <FiltersContext.Provider
      value={{ filters, setFilters, cities, airlines, menu, setMenu }}
    >
      {children}
    </FiltersContext.Provider>
  );
};

export default FiltersContext;
