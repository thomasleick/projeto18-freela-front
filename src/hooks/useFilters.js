import { useContext } from "react";
import FiltersContext from "../contexts/FiltersProvider";

const useFilters = () => {
  return useContext(FiltersContext);
};

export default useFilters;
