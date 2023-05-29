import React from "react";
import styled from "styled-components";
import useFilters from "../hooks/useFilters";
import FlightsMenu from "./FlightsMenu";
import FlightMenu from "./FlightMenu";
import HotelsMenu from "./HotelsMenu";
import useTheme from "../hooks/useTheme";

const SideMenu = () => {
  const { menu } = useFilters();
  const { secondaryText } = useTheme().colors;
  
  return (
    <Aside backgroundColor={secondaryText}>
      {menu === "flights" && <FlightsMenu />}
      {menu === "flight" && <FlightMenu />}
      {menu === "hotels" && <HotelsMenu />}
    </Aside>
  );
};

const Aside = styled.aside`
  background-color: ${(props) => props.backgroundColor};
  height: calc(100dvh - 50px);
  width: 230px;
  padding: 25px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: scroll;
  * {
    margin: 5px 0;
  }
`;

export default SideMenu;
