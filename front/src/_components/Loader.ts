import styled from "styled-components";
import { colors } from "../theme";

export const Loader = styled.div<{ width?: number }>`
  border: 16px solid ${colors.blanco}; /* Light grey */
  border-top: 16px solid ${colors.azulOscuro}; /* Blue */
  border-radius: 50%;
  width: ${(props) => (props.width ? props.width : "120")}px;
  height: ${(props) => (props.width ? props.width : "120")}px;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
