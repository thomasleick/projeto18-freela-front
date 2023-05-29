import React, { useEffect, useState } from "react";
import { Slider, TextField, Button } from "@mui/material";
import Select from "react-select";
import useFilters from "../hooks/useFilters";
import useTheme from "../hooks/useTheme";
import DatePicker from "react-datepicker";
import blendColors from "../utils/blendColors";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import useTrip from "../hooks/useTrip";

const FlightsMenu = () => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000);
  const { choosenCity } = useTrip();
  const [citiesList, setCitiesList] = useState([]);
  const [airlinesList, setAirlinesList] = useState([]);
  const { setFilters, cities, airlines } = useFilters();
  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedCitiesDestination, setSelectedCitiesDestination] =
    useState(choosenCity);
  const [selectedAirlines, setSelectedAirlines] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const { colors } = useTheme();

  const handleMinPriceChange = (event) => {
    setMinPrice(Number(event.target.value));
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(Number(event.target.value));
  };

  const handleApplyFilter = () => {
    const departureCities = selectedCities.map((city) => city.value);
    const destinationCities = selectedCitiesDestination.map(
      (city) => city.value
    );
    const airlineList = selectedAirlines.map((airline) => airline.value);
    const newDate = selectedDate?.toISOString()?.slice(0, 10) || "";
    setFilters({
      minPrice,
      maxPrice,
      departureCities,
      destinationCities,
      airlineList,
      selectedDate: newDate,
    });
  };

  const handleSelectionChange = (selectedOptions) => {
    setSelectedCities(selectedOptions);
  };
  const handleSelectionChangeDestination = (selectedOptions) => {
    setSelectedCitiesDestination(selectedOptions);
  };
  const handleSelectionChangeAirline = (selectedOptions) => {
    setSelectedAirlines(selectedOptions);
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    const newCities = cities?.cities?.map((city) => ({
      value: city.city_id,
      label: city.city_name,
    }));
    setCitiesList(newCities);
  }, [cities]);
  useEffect(() => {
    const newAirlines = airlines?.airlines?.map((airline) => ({
      value: airline.airline_id,
      label: airline.airline_name,
    }));
    setAirlinesList(newAirlines);
  }, [airlines]);
  useEffect(() => {}, []);

  const customStyles = {
    valueContainer: (provided, state) => ({
      ...provided,
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
    }),
    control: (provided, state) => ({
      ...provided,
      borderRadius: 25,
      border: "2px solid",
      boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
      fontSize: 18,
      textAlign: "center",

      backgroundColor: state.isFocused
        ? blendColors(colors.focusInputBackground, "#FFFFFF")
        : "white",
      borderColor: state.isFocused
        ? `${colors.focusInputBorder} !important`
        : "#ccc !important",
      outline: state.isFocused && "none !important",
      "&:hover": {
        backgroundColor: blendColors(colors.focusInputBackground, "#FFFFFF"),
      },
    }),
    menu: (provided, state) => ({
      ...provided,
      borderRadius: 15,
      border: `2px solid ${colors.borderInput}`,
      boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
      fontSize: 18,
      textAlign: "center",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? colors.focusInputBackground
        : colors.background,
      color: state.isSelected ? "lightgrey" : "black",
      border: "none",
      margin: 0,
      "&:hover": {
        backgroundColor: blendColors(colors.focusInputBackground, "#FFFFFF"),
        color: colors.secondaryText,
      },
    }),
    multiValue: (provided, state) => ({
      ...provided,
      backgroundColor: colors.focusInputBackground,
      borderRadius: 25,
    }),
    multiValueLabel: (provided, state) => ({
      ...provided,
      color: `${colors.secondaryText}`,
    }),
    multiValueRemove: (provided, state) => ({
      ...provided,
      backgroundColor: blendColors(colors.secondaryText + "55", "#FFFFFF"),
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: 20,
      height: 20,
      cursor: "pointer",
      "&:hover": {
        backgroundColor: colors.secondaryText,
      },
    }),
  };
  return (
    <>
      <StyledSelect
        isMulti
        options={citiesList}
        styles={customStyles}
        value={selectedCities}
        onChange={handleSelectionChange}
        placeholder="Escolha as cidades de partida"
      />
      <StyledDatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        focusBackground={blendColors(colors.focusInputBackground, "#FFFFFF")}
        dateFormat="dd/MM/yyyy"
        placeholderText="Data de partida"
      />
      <StyledSelect
        isMulti
        options={citiesList}
        styles={customStyles}
        value={selectedCitiesDestination}
        onChange={handleSelectionChangeDestination}
        placeholder="Escolha os destinos"
      />
      <StyledSelect
        isMulti
        options={airlinesList}
        styles={customStyles}
        value={selectedAirlines}
        onChange={handleSelectionChangeAirline}
        placeholder="Escolha as linhas aéreas"
      />
      <StyledTextField
        label="Valor mínimo"
        type="number"
        value={minPrice}
        onChange={handleMinPriceChange}
      />
      <StyledTextField
        label="Valor máximo"
        type="number"
        value={maxPrice}
        onChange={handleMaxPriceChange}
      />
      <StyledSlider
        value={[minPrice, maxPrice]}
        onChange={(_, newValue) => {
          setMinPrice(newValue[0]);
          setMaxPrice(newValue[1]);
        }}
        min={0}
        max={5000}
        step={1}
        valueLabelDisplay="auto"
      />
      <StyledButton variant="contained" onClick={handleApplyFilter}>
        APLICAR FILTROS
      </StyledButton>
    </>
  );
};
const StyledDatePicker = styled(DatePicker)`
  && {
    height: 56px;
    width: 210px;
    margin: 5px 10px;
    padding: 0; /* Reset padding */
    box-sizing: border-box; /* Include padding and border in the element's total width */
    :focus {
      background-color: ${(props) => props.focusBackground};
    }
  }
`;
const StyledTextField = styled(TextField)`
  && {
    input {
      color: white;
    }
    label {
      color: white;
    }

    && .MuiOutlinedInput-root {
      border-radius: 25px;
      height: 56px;
      width: 210px;
    }

    && .MuiOutlinedInput-input {
      color: #ffffff;
      padding: 14px;
    }

    && .MuiOutlinedInput-notchedOutline {
      border-color: #ffffff;
      border-width: 2px;
    }

    &&:hover .MuiOutlinedInput-notchedOutline {
      border-color: #ffffff;
    }

    &&.Mui-focused .MuiOutlinedInput-notchedOutline,
    &&:focus .MuiOutlinedInput-notchedOutline {
      border-color: #ffffff;
      box-shadow: 0 0 0 2px #ffffff40;
    }
  }
`;

const StyledSlider = styled(Slider)`
  && {
    color: white;
  }
`;

const StyledButton = styled(Button)`
  && {
    background-color: white;
    color: #b44fff;
    border-radius: 25px;
  }
  &&:focus,
  &&:hover {
    color: white;
  }
`;

const StyledSelect = styled(Select)`
  && {
    width: 210px;
    color: white;

    &&.react-select__control {
      background-color: white;
      border-radius: 25px;
      height: 56px;
      width: 100%;
      border-color: #ffffff;
      border-width: 2px;
      color: white;

      &&:hover {
        border-color: #ffffff;
      }

      &&:focus {
        border-color: #ffffff;
        box-shadow: 0 0 0 2px #ffffff40;
      }
    }

    .react-select__placeholder {
      color: white;
    }

    .react-select__single-value {
      color: white;
    }

    .react-select__multi-value {
      background-color: #ffffff;
      color: #b44fff;
      margin-right: 8px;
      margin-top: -4px;
      margin-bottom: 8px;
      border-radius: 16px;

      &:hover {
        background-color: #ffffff;
        color: #ffffff;
      }
    }

    .react-select__multi-value__label,
    .react-select__multi-value__remove {
      color: #b44fff;
    }

    .react-select__indicator-separator {
      background-color: #ffffff;
    }
  }
`;
export default FlightsMenu;
