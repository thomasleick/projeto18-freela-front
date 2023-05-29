import { createContext, useState } from "react";
import React from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const TripContext = createContext({});

export const TripProvider = ({ children }) => {
  const [choosenFlight, setChoosenFlight] = useLocalStorage(
    "choosenFlight",
    ""
  );
  const [choosenHotel, setChoosenHotel] = useLocalStorage("choosenHotel", "");
  const [choosenCity, setChoosenCity] = useLocalStorage("choosenCity", "");
  const [cardCity, setCardCity] = useState("");

  return (
    <TripContext.Provider
      value={{
        choosenFlight,
        setChoosenFlight,
        choosenHotel,
        setChoosenHotel,
        choosenCity,
        setChoosenCity,
        cardCity,
        setCardCity,
      }}
    >
      {children}
    </TripContext.Provider>
  );
};

export default TripContext;
