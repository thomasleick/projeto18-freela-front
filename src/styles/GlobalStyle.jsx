import { createGlobalStyle } from "styled-components";
import useTheme from "../hooks/useTheme";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Lexend Deca', 'Roboto', sans-serif;
    background-color: ${(props) => props.colors.background};
    color: ${(props) => props.colors.primaryText};

  }
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    * {
      margin: 10px;
    }
  }
  input {
      width: 769px;
      height: 60px;
      text-indent: 22px;
      background: #ffffff;
      border: 2px solid ${(props) => props.colors.borderInput};
      box-shadow: 0px 4px 24px rgba(120, 177, 89, 0.12);
      border-radius: 50px;

      :focus {
        background-color: ${(props) => props.colors.focusInputBackground};
        border: 2px solid ${(props) => props.colors.focusInputBorder};
        outline: none;
      }
      :disabled {
        background-color: ${(props) => props.colors.disabledInput};
        color: #999;
        cursor: not-allowed;
        text-decoration: line-through;
      }

      ::placeholder {
        font-family: "Lexend Deca";
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 18px;
        color: #9c9c9c;
      }
    }
    button {
      width: 182px;
      height: 60px;
      background: ${props => props.colors.secondaryText + "99"};
      border: 2px solid ${(props) => props.colors.borderInput};
      box-shadow: 0px 4px 24px rgba(120, 177, 89, 0.12);
      border-radius: 50px;
      margin-top: 51px;
      cursor: pointer;

      &:disabled {
        background-color: ${(props) => props.colors.disabledInput};
        color: #999;
        cursor: not-allowed;
        text-decoration: line-through;
      }

      h2 {
        font-family: "Lexend Deca";
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 18px;
        color: #ffffff;
      }
    }

    button:not(:disabled):hover,
    button:not(:disabled):focus {
      background: ${props => props.colors.secondaryText};
      border: 2px solid ${(props) => props.colors.focusInputBorder};
      outline: none;
    }
`;

const GlobalStyleWrapper = () => {
  const { colors } = useTheme();
  return <GlobalStyle colors={colors} />;
};

export default GlobalStyleWrapper;