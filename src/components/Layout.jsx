import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import styled from "styled-components";
import SideMenu from "./SideMenu";

const Layout = () => {
  return (
    <>
      <SideMenu />
      <Container>
        <Header />
        <OutletContainer>
          <Outlet />
        </OutletContainer>
      </Container>
    </>
  );
};

const Container = styled.div`
  height: 100dvh;
  width: calc(100vw - 250px);
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  right: 0;
`;

const OutletContainer = styled.div`
  overflow: scroll;
`;
export default Layout;
