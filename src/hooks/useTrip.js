import { useContext } from "react";
import TripContext from "../contexts/TripProvider";

const useTrip = () => {
  return useContext(TripContext);
};

export default useTrip;
