import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { ThreeDots } from "react-loader-spinner";
import ErrWrapper from "../components/Err";
import { axiosPrivate } from "../api/axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useInput from "../hooks/useInput";
import useTheme from "../hooks/useTheme";
import useFilters from "../hooks/useFilters";

const SignUp = () => {
  const { setAuth } = useAuth();
  const [email, resetEmail, emailAttribs] = useInput("email", "");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [clearErrMsg, setClearErrMsg] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { setMenu } = useFilters();
  const emailRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();
  const { secondaryText } = useTheme().colors;

  useEffect(() => {
    emailRef.current.focus();
    setMenu("");
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleInputChange = (value, setFunction) => {
    !clearErrMsg && setClearErrMsg(true);
    setFunction(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setErrMsg("Email inválido");
      return;
    }
    if (password.length < 6) {
      setErrMsg("Senha deve possuir pelo menos 6 caracteres");
      return;
    }

    const body = { email, password };

    try {
      setIsLoading(true);
      const response = await axiosPrivate.post("/auth/signin", body);
      setAuth({
        name: response.data.name,
        email: response.data.email,
        accessToken: response.data.accessToken,
      });
      navigate("/", { replace: true });
    } catch (err) {
      console.log(err);
      if (!err?.response) {
        setErrMsg("Sem resposta do servidor");
      } else if (err.response?.status === 400) {
        setErrMsg("Faltando email e/ou senha");
      } else if (err.response?.status === 401) {
        setErrMsg("Email e/ou senha inválido(a)");
      } else {
        setErrMsg("Falha ao tentar fazer login");
      }
      errRef.current.focus();
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <main>
      <ErrWrapper status={errMsg ? "errmsg" : "offscreen"} posTop="325px">
        <span ref={errRef}>{errMsg}</span>
      </ErrWrapper>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Email"
          disabled={isLoading}
          ref={emailRef}
          {...emailAttribs}
        />
        <input
          placeholder="Senha"
          type="password"
          value={password}
          onChange={(e) => handleInputChange(e.target.value, setPassword)}
          disabled={isLoading}
        />
        <button disabled={isLoading}>
          {isLoading ? (
            <Span>
              <ThreeDots
                height="60"
                width="80"
                radius="15"
                color={secondaryText}
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
              />
            </Span>
          ) : (
            <h2>Entrar</h2>
          )}
        </button>
      </form>
    </main>
  );
};

const Span = styled.span`
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default SignUp;
