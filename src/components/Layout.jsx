import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import styled from "styled-components";

const Layout = () => {
  return (
    <>
      <Header />
      <OutletContainer>
        <Outlet />
      </OutletContainer>
    </>
  );
};

const OutletContainer = styled.div`
  height: calc(100dvh - 300px);
`;
export default Layout;
