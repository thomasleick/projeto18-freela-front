import React from "react";
import styled from "styled-components";
import save from "../assets/save.png";
import cancel from "../assets/cancel.png";
import useTheme from "../hooks/useTheme";
import { Link, useNavigate, useParams } from "react-router-dom";
import useTrip from "../hooks/useTrip";
import blendColors from "../utils/blendColors";
import useFilters from "../hooks/useFilters";

const HotelMenu = () => {
  const { focusInputBackground } = useTheme().colors;
  const { setChoosenHotel, setChoosenCity, cardCity, choosenFlight } = useTrip();
  const { cities } = useFilters();
  const { id } = useParams();
  const navigate = useNavigate();
  const handleSaveHotel = () => {
    const city = cities.cities.find((city) => city.city_name === cardCity);
    setChoosenHotel(id);
    setChoosenCity({ value: city.city_id, label: city.city_name });
    if(choosenFlight) {
        navigate("/finish");
        return;
    }
    navigate("/");
  };

  const spanBackground = blendColors(focusInputBackground, "#FFFFFF");

  return (
    <Container spanBackground={spanBackground}>
      <span onClick={handleSaveHotel}>
        <Img src={save} alt="Salvar" />
        <p>Finalizar</p>
      </span>
        <span>
          <Img src={cancel} alt="Voltar" />
          <p>Limpar escolhas</p>
        </span>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;

  span {
    background-color: ${(props) => props.spanBackground};
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    padding: 20px;
    width: 176px;
    height: 176px;
    border-radius: 25px;

    p {
      font-weight: 600;
    }
  }
`;

const Img = styled.img`
  height: 64px;
  width: 64px;
`;
export default HotelMenu;
