import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { ThreeDots } from "react-loader-spinner";
import ErrWrapper from "../components/Err";
import { axiosPrivate } from "../api/axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [clearErrMsg, setClearErrMsg] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const nameRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [name, email, password, confirmPassword]);

  const handleInputChange = (value, setFunction) => {
    !clearErrMsg && setClearErrMsg(true);
    setFunction(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name) {
      setErrMsg("Preencha o campo Nome");
      return;
    }
    if (!emailRegex.test(email)) {
      setErrMsg("Email inválido");
      return;
    }
    if (password !== confirmPassword) {
      setErrMsg("Senhas não são iguais");
      return;
    }
    if (password.length < 6) {
      setErrMsg("Senha deve possuir pelo menos 6 caracteres");
      return;
    }

    const body = { name, email, password, confirmPassword };

    try {
      setIsLoading(true);
      await axiosPrivate.post("/auth/signup", body);

      navigate("/signin", { replace: true });
    } catch (err) {
      console.log(err);
      if (!err?.response) {
        setErrMsg("Sem resposta do servidor");
      } else if (err.response?.status === 400) {
        setErrMsg("Faltando nome, email e/ou senhas");
      } else if (err.response?.status === 401) {
        setErrMsg("Não autorizado");
      } else if (err.response?.status === 409) {
        setErrMsg("E-mail em uso");
      } else {
        setErrMsg("Falha ao criar a conta");
      }
      errRef.current.focus();
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <main>
      <ErrWrapper status={errMsg ? "errmsg" : "offscreen"} posTop="255px">
        <span ref={errRef}>{errMsg}</span>
      </ErrWrapper>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Nome"
          value={name}
          onChange={(e) => handleInputChange(e.target.value, setName)}
          ref={nameRef}
          disabled={isLoading}
        />
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => handleInputChange(e.target.value, setEmail)}
          disabled={isLoading}
        />
        <input
          placeholder="Senha"
          value={password}
          onChange={(e) => handleInputChange(e.target.value, setPassword)}
          disabled={isLoading}
          type="password"
        />
        <input
          placeholder="Confirmar senha"
          value={confirmPassword}
          onChange={(e) =>
            handleInputChange(e.target.value, setConfirmPassword)
          }
          disabled={isLoading}
          type="password"
        />
        <button disabled={isLoading}>
          {isLoading ? (
            <Span>
              <ThreeDots
                height="60"
                width="80"
                radius="15"
                color="#5d9040ff"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
              />
            </Span>
          ) : (
            <h2>Criar Conta</h2>
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
