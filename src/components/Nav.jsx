import React from "react";
import styled from "styled-components";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useTheme from "../hooks/useTheme";

const Nav = () => {
  const { auth, setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const { secondaryText } = useTheme().colors;

  const handleLogout = async (event) => {
    event.preventDefault();
    try {
      await axiosPrivate.post("/auth/logout");
      setAuth("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <NavContainer token={auth?.accessToken}>
      {auth?.accessToken ? (
        <>
          <div>
            <H1 color={secondaryText}>Seja bem-vindo(a), {auth.name.split(" ")[0]}</H1>
          </div>
          <Right>
            <Link to="/">Passagens Aéreas</Link>
            <Link to="/hotels">Hotéis</Link>
            <Link onClick={handleLogout}>Sair</Link>
          </Right>
        </>
      ) : (
        <Right color={secondaryText}>
          <Link to="/signin">Entrar</Link>
          <Link to="/signup">
            <span>Cadastre-se</span>
          </Link>
        </Right>
      )}
    </NavContainer>
  );
};

const NavContainer = styled.nav`
  width: calc(100% - 200px);
  display: flex;
  justify-content: ${(props) => (props.token ? "space-between" : "flex-end")};

`;
const H1 = styled.h1`
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    color: ${props => props.color};
`
const Right = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: #9c9c9c;

  * {
    margin: 0 10px;
  }

  span {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    color: ${props => props.color};
  }
`;

export default Nav;
