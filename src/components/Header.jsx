import React from "react";
import styled from "styled-components";
import amazingTrips from "../assets/amazingTrips.png";
import Nav from "./Nav";
import { useNavigate } from "react-router-dom";
import useTheme from "../hooks/useTheme";

const Header = () => {
  const navigate = useNavigate();
  const { secondaryText } = useTheme().colors;

  const handleNavigate = () => {
    navigate("/");
  };

  return (
    <HeaderContainer>
      <Nav />
      <LogoContainer color={secondaryText} onClick={handleNavigate}>
        <Img inverted={true} src={amazingTrips} alt="Amazing Trips" />
        <h1>Amazing Trips</h1>
        <Img src={amazingTrips} alt="Amazing Trips" />
      </LogoContainer>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;
const Img = styled.img`
  ${(props) => props.inverted && "transform: scaleX(-1);"}
`;
const LogoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  h1 {
    font-style: normal;
    font-weight: 200;
    font-size: 64px;
    line-height: 80px;
    margin: 0 20px;
    color: ${(props) => props.color};
  }
`;

export default Header;
