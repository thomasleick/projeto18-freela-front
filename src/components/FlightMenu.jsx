import React from "react";
import styled from "styled-components";
import save from "../assets/save.png";
import cancel from "../assets/cancel.png";
import useTheme from "../hooks/useTheme";
import { Link, useNavigate, useParams } from "react-router-dom";
import useTrip from "../hooks/useTrip";
import blendColors from "../utils/blendColors";

const FlightMenu = () => {
  const { focusInputBackground } = useTheme().colors;
  const { setChoosenFlight } = useTrip();
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSaveFlight = () => {
    setChoosenFlight(id);
    navigate("/hotels");
  };

  const spanBackground = blendColors(focusInputBackground, "#FFFFFF");
  return (
    <Container spanBackground={spanBackground}>
      <span onClick={handleSaveFlight}>
        <Img src={save} alt="Salvar" />
        <p>Escolher hotel</p>
      </span>
      <Link to="/">
        <span>
          <Img src={cancel} alt="Voltar" />
          <p>Voltar</p>
        </span>
      </Link>
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
export default FlightMenu;
