import React, { FC } from "react";
import styled from "styled-components";
import { colors } from "../theme";

interface Props {
  type?: "warning" | "info";
  children: React.ReactNode;
}

export const Notification: FC<Props> = ({ type = "warning", ...props }) => {
  if (type === "info") {
    return (
      <Info>
        <P>{props.children}</P>
      </Info>
    );
  }

  return <Warning>{props.children}</Warning>;
};

const Warning = styled.div`
  background-color: ${colors.amarillo};
  border-radius: 5px;
  min-width: 350px;
`;

const Info = styled.div`
  background-color: ${colors.azulClaro}4d;
  border-radius: 5px;
  padding: 4px;

  max-width: 350px;
`;

const P = styled.p`
  margin: 0;
  font-size: 14px;
`;
