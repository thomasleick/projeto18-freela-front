import { createContext, useState } from "react";
import React from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const TripContext = createContext({});

export const TripProvider = ({ children }) => {
  const [choosenFlight, setChoosenFlight] = useLocalStorage("choosenFlight", "");
  const [choosenHotel, setChoosenHotel] = useLocalStorage("choosenHotel", "");

  return (
    <TripContext.Provider value={{ choosenFlight, setChoosenFlight, choosenHotel, setChoosenHotel }}>
      {children}
    </TripContext.Provider>
  );
};

export default TripContext;
