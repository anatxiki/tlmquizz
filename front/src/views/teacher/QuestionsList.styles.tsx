import styled from "styled-components";
import { colors } from "../../theme";

export const IconButton = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
`;

export const TextArea = styled.textarea`
  background-color: ${colors.azulClaro}4d;
  border: 2px solid transparent;
  border-radius: 5px;

  @media screen and (min-width: 900px) {
    width: 300px;
  }

  &::placeholder {
    font-size: 0.8em;
    font-style: italic;
  }

  &:focus {
    border-color: ${colors.azulOscuro};
  }

  resize: none;
  outline: none;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const CloseButton = styled.img`
  width: 8px;
  height: 8px;

  margin-right: -20px;
  margin-left: auto;

  cursor: pointer;
`;

export const Label = styled.label`
  font-weight: 600;
  text-align: left;
`;

export const FormWrapper = styled.div`
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

export const Trash = styled.img`
  width: 20px;
  height: 20px;

  cursor: pointer;
`;

export const Eyes = styled.img`
  width: 20px;
  height: 20px;

  cursor: pointer;
`;

export const P = styled.p`
  font-weight: 600;

  padding: 4px 16px;
`;
export const Cosas = styled.div``;

export const Container = styled.div`
  width: 100%;

  min-height: 300px;
`;

export const Titulo = styled.h1`
  font-weight: 600;
  font-size: 32px;

  margin-bottom: 40px;
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

export const Table = styled.table`
  min-width: 350px;
  @media screen and (min-width: 900px) {
    min-width: 600px;
  }
  border-collapse: collapse;

  tr:nth-last-child(odd) {
    background-color: ${colors.azul}4d;

    border-top: 1px solid ${colors.azul};
    border-bottom: 1px solid ${colors.azul};
  }

  td {
    padding: 8px 16px;
  }
`;

export const ActionButton = styled.td`
  display: flex;
  justify-content: end;
  gap: 8px;
`;
