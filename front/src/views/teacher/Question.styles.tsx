import styled from "styled-components";
import { colors } from "../../theme";

export const PWrapper = styled.p`
  font-weight: 600;

  margin-top: 40px;
`;

export const Respuestas = styled.div`
  flex-grow: 1;
`;

export const Resultados = styled.div`
  background-color: ${colors.azulClaro}4d;
  width: 150px;
  text-align: center;

  border-radius: 5px;
`;

export const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 24px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const UserWrapper = styled.p`
  margin: 0;
  margin-bottom: 4px;
`;

export const DateWrapper = styled.span`
  font-size: 9px;
`;

export const RespuestaWrapper = styled.div`
  background-color: ${colors.azulClaro}4d;
  padding: 8px 4px;
  margin-bottom: 16px;
  border-radius: 5px;

  max-width: 350px;
`;

export const Wrapper = styled.div`
  padding: 8px;
`;

export const BreadcCrumbsWrapper = styled.div`
  margin-bottom: 16px;
`;

export const BreadCrumbs = styled.div`
  text-align: left;

  font-weight: 600;
  font-size: 24px;
`;

export const Container = styled.div`
  width: 100%;
  display: flex;

  min-height: 300px;
  min-width: 280px;

  @media screen and (min-width: 650px) {
    min-width: 600px;
  }
`;

export const Titulo = styled.h1`
  font-weight: 600;
  font-size: 24px;

  margin-bottom: 40px;
`;

export const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 250px;
  padding: 8px 20px;

  @media screen and (min-width: 900px) {
    max-width: 320px;
    padding: 16px 40px;
  }
`;

export const CloseButton = styled.img`
  width: 8px;
  height: 8px;

  margin-right: -20px;
  margin-left: auto;

  cursor: pointer;
`;
