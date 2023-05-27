import React, { useState } from "react";
import styled from "styled-components";
import { Slider, TextField, Button } from "@mui/material";
import useFilters from "../hooks/useFilters";

const SideMenu = () => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000);
  const { setFilters } = useFilters();

  const handleMinPriceChange = (event) => {
    setMinPrice(Number(event.target.value));
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(Number(event.target.value));
  };

  const handleApplyFilter = () => {
    console.log(`Min Price: ${minPrice}, Max Price: ${maxPrice}`);
    setFilters({ minPrice, maxPrice })
  };

  return (
    <Aside>
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
    </Aside>
  );
};

const Aside = styled.aside`
  background-color: #b44fff;
  height: calc(100% - 50px);
  width: 230px;
  padding: 25px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  * {
    margin: 5px 0;
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
      height: 56px; /* Set a fixed height */
      width: 210px; /* Set a fixed width */
    }

    && .MuiOutlinedInput-input {
      color: #ffffff; /* Change the input text color */
      padding: 14px;
    }

    && .MuiOutlinedInput-notchedOutline {
      border-color: #ffffff; /* Change the outline border color */
      border-width: 2px;
    }

    &&:hover .MuiOutlinedInput-notchedOutline {
      border-color: #ffffff; /* Change the outline border color on hover */
    }

    &&.Mui-focused .MuiOutlinedInput-notchedOutline,
    &&:focus .MuiOutlinedInput-notchedOutline {
      border-color: #ffffff; /* Change the outline border color when focused or input is focused */
      box-shadow: 0 0 0 2px #ffffff40; /* Add a white box shadow when focused or input is focused */
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
  &&:focus, &&:hover {
    color: white;
  }
`;

export default SideMenu;