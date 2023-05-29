import React, { useEffect, useState } from "react";
import { Slider, TextField, Button } from "@mui/material";
import Select from "react-select";
import useFilters from "../hooks/useFilters";
import useTheme from "../hooks/useTheme";
import useTrip from "../hooks/useTrip";
import blendColors from "../utils/blendColors";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";

const HotelsMenu = () => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const { choosenCity } = useTrip();
  const [citiesList, setCitiesList] = useState([]);
  const { setFilters, cities } = useFilters();
  const [selectedCities, setSelectedCities] = useState([choosenCity]);
  const { colors } = useTheme();
  const handleMinPriceChange = (event) => {
    setMinPrice(Number(event.target.value));
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(Number(event.target.value));
  };

  const handleApplyFilter = () => {
    const hotelCities = selectedCities.map((city) => city.value);
    setFilters({
      minPrice,
      maxPrice,
      cities: hotelCities,
    });
  };

  const handleSelectionChange = (selectedOptions) => {
    setSelectedCities(selectedOptions);
  };

  useEffect(() => {
    const newCities = cities?.cities?.map((city) => ({
      value: city.city_id,
      label: city.city_name,
    }));
    setCitiesList(newCities);
  }, [cities]);
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
        placeholder="Escolha as cidades"
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
        max={1000}
        step={1}
        valueLabelDisplay="auto"
      />
      <StyledButton variant="contained" onClick={handleApplyFilter}>
        APLICAR FILTROS
      </StyledButton>
    </>
  );
};
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
export default HotelsMenu;
