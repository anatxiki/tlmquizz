import React, { FC } from "react";
import styled from "styled-components";
import { colors } from "../theme";
import { Link as ReactLink, To } from "react-router-dom";

interface Props {
  onClick?: (event?: any) => void;
  to: To;
  children: React.ReactNode;
  target?: "_blank" | "_self";
}

export const Link: FC<Props> = ({ target = "_self", ...props }) => {
  return (
    <StyledLink onClick={props.onClick} to={props.to}>
      {props.children}
    </StyledLink>
  );
};

const StyledLink = styled(ReactLink)`
  color: ${colors.azul};
  text-decoration: none;

  font-weight: 600;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;
