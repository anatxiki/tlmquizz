import styled from "styled-components";
import { colors } from "../theme";
import React, { FC } from "react";

interface Props {
  onClick?: (event?: any) => void;
  type?: "submit" | "button";
  width?: string;
  ariaDisabled?: boolean;
  children: React.ReactNode;
  loading?: boolean;
  color?: string;
}

export const Button: FC<Props> = ({ type = "button", ...props }) => {
  return (
    <StyledButton
      type={type}
      onClick={props.onClick}
      width={props.width}
      aria-disabled={props.ariaDisabled}
      loading={props.loading}
      color={props.color}
    >
      {props.children}
    </StyledButton>
  );
};

const StyledButton = styled.button<{
  width?: string;
  loading?: boolean;
  color?: string;
}>`
  position: relative;
  background-color: ${(props) => (props.color ? props.color : colors.azul)};
  color: ${colors.blanco};

  padding: 4px 16px;

  text-align: center;

  transition-duration: 0.4s;
  cursor: pointer;

  &:hover {
    background-color: ${colors.azulOscuro};
    color: ${colors.blanco};
  }

  &[aria-disabled="true"] {
    opacity: 0.8;
    cursor: not-allowed;
  }

  ${(props) =>
    props.loading
      ? `
    &::after {
      content: "";
      position: absolute;
      width: 16px;
      height: 16px;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      border: 4px solid transparent;
      border-top-color: ${colors.blanco};
      border-radius: 50%;
      animation: button-loading-spinner 1s ease infinite;
    }

    @keyframes button-loading-spinner {
      from {
        transform: rotate(0turn);
      }
    
      to {
        transform: rotate(1turn);
      }
    }
  `
      : ""}

  width: ${(props) => (props.width ? props.width : "auto")};
`;
