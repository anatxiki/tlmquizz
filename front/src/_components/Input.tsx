import React from "react";
import styled from "styled-components";
import { colors } from "../theme";

interface Props {
  id?: string;
  name?: string;
  type?: "text" | "password";
  onInput?: (event?: any) => void;
  onChange?: (event?: any) => void;
  value?: any;
}

export const Input: React.FC<Props> = ({ type = "text", ...props }) => {
  return (
    <StyledInput
      id={props.id}
      name={props.name}
      type={type}
      value={props.value}
      onInput={props.onInput}
      onChange={props.onChange}
    />
  );
};

const StyledInput = styled.input`
  width: 100%;
  background-color: ${colors.azulClaro}4d;
  border: 2px solid transparent;

  box-sizing: border-box;

  &:focus {
    border-color: ${colors.azulOscuro};
  }
`;
