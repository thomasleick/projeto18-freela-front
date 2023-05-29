import React from "react";
import styled from "styled-components";
import save from "../assets/save.png";
import cancel from "../assets/cancel.png";
import useTheme from "../hooks/useTheme";
import { useNavigate } from "react-router-dom";
import useTrip from "../hooks/useTrip";
import blendColors from "../utils/blendColors";

const HotelMenu = () => {
  const { focusInputBackground } = useTheme().colors;
  const { setChoosenHotel, setChoosenCity } = useTrip();
  const navigate = useNavigate();

  const handleFinish = () => {
    navigate("/");
  };

  const handleCleanLocalStorage = () => {
    setChoosenHotel("");
    setChoosenCity("");
    navigate("/");
  };

  const spanBackground = blendColors(focusInputBackground, "#FFFFFF");

  return (
    <Container spanBackground={spanBackground}>
      <span onClick={handleFinish}>
        <Img src={save} alt="Salvar" />
        <p>Finalizar</p>
      </span>
      <span onClick={handleCleanLocalStorage}>
        <Img src={cancel} alt="Limpar" />
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
