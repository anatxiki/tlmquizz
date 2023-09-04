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

export const Trash = styled.img`
  width: 20px;
  height: 20px;

  cursor: pointer;
`;

export const CloseButton = styled.img`
  width: 8px;
  height: 8px;

  margin-right: -20px;
  margin-left: auto;

  cursor: pointer;
`;

export const FormWrapper = styled.div`
  margin-bottom: 40px;
`;

export const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;

  max-width: 250px;
  padding: 8px 20px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const Label = styled.label`
  font-weight: 600;
  text-align: left;
`;

export const Table = styled.table`
  min-width: 400px;
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

export const Row = styled.td``;

export const ActionButton = styled.td`
  display: flex;
  justify-content: end;
`;

export const Wrapper = styled.div`
  padding: 8px;
`;

export const Titulo = styled.h1`
  font-weight: 600;

  margin-bottom: 40px;
`;

export const P = styled.p`
  font-weight: 600;

  padding: 4px 16px;
`;

export const Container = styled.div`
  width: 100%;

  min-height: 300px;
`;
