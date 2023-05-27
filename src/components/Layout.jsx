import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import styled from "styled-components";
import SideMenu from "./SideMenu";
import { useState } from "react";

const Layout = () => {
  return (
    <>
      <Header />
      <Container>
        <SideMenu />
        <OutletContainer>
          <Outlet />
        </OutletContainer>
      </Container>
    </>
  );
};

const Container = styled.div`
  height: calc(100dvh - 150px);
  display: flex;
`;

const OutletContainer = styled.div`
  width: calc(100vw - 250px);
  overflow: scroll;
`;
export default Layout;
