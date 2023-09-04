import styled from "styled-components";
import { colors } from "../theme";
import React, { FC } from "react";

interface Props {
  value: string;
  name: string;
  children: React.ReactNode;
  defaultChecked?: boolean;
  checked?: boolean;
  onChange?: () => void;
}

export const RadioInput: FC<Props> = ({ ...props }) => {
  return (
    <>
      <StyledLabel>
        {props.children}
        <input
          type="radio"
          value={props.value}
          name={props.name}
          defaultChecked={props.defaultChecked}
          checked={props.checked}
          onChange={props.onChange}
        />
        <Checked />
      </StyledLabel>
    </>
  );
};

const Checked = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${colors.azulClaro}4d;

  &:after {
    content: "";
    position: absolute;
    display: none;
  }
`;

const StyledLabel = styled.label`
  display: block;
  position: relative;
  padding-left: 36px;
  margin-bottom: 12px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  font-weight: 600;

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
  }

  &:hover input ~ ${Checked} {
    background-color: ${colors.azulClaro}64;
  }

  input:checked ~ ${Checked} {
    background-color: ${colors.azulOscuro};
  }

  input:checked ~ ${Checked}:after {
    display: block;
  }

  ${Checked}:after {
    top: 6px;
    left: 6px;

    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${colors.blanco};
  }
`;
