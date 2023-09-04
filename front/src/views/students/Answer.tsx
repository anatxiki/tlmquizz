import React, { FC, useEffect, useState } from "react";
import { Loader } from "../../_components/Loader";
import { Button } from "../../_components/Button";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { Link } from "../../_components/Link";
import { colors } from "../../theme";
import { sendAnswer } from "../../domain/services/sendAnswer";
import { getRooms } from "../../domain/services/getRooms";
import { getPregunta } from "../../domain/services/getPregunta";

export const Answer: FC = () => {
  const { id } = useParams();
  const [pregunta, setPregunta] = useState<any>(undefined);
  const navigate = useNavigate();

  const [respuesta, setRespuesta] = useState<string>("");
  const [myRoom, setRoom] = useState<any>(undefined);

  const updatePregunta = () => getPregunta(myRoom.id).then(setPregunta);

  useEffect(() => {
    const onLoad = async () => {
      const rooms = await getRooms();
      const room = rooms.find((room: any) => room.id.toString() === id);

      if (room === undefined) {
        navigate(`/rooms`);
        return;
      }

      setRoom(room);
    };

    onLoad();
  }, []);

  useEffect(() => {
    if (myRoom === undefined) return;
    updatePregunta();
    const interval = setInterval(() => updatePregunta(), 5000);
    return () => clearInterval(interval);
  }, [myRoom]);

  const enviar = async () => {
    await sendAnswer(pregunta.id, respuesta);
    setPregunta(undefined);
  };

  const isLoading = pregunta === undefined || myRoom === undefined;

  return (
    <>
      <Wrapper>
        <BreadCrumbs>
          <Link to="/rooms">Mis salas</Link>
          {myRoom !== undefined && `> ${myRoom.name}`}
        </BreadCrumbs>
      </Wrapper>
      {isLoading ? (
        <>
          <p>Esperando a la pregunta del owner</p>
          <Loader />
        </>
      ) : (
        <form onSubmit={() => {}}>
          <P>{pregunta.title}</P>
          <TextArea
            name="respuesta"
            rows={4}
            value={respuesta}
            onChange={(e) => setRespuesta(e.target.value)}
            placeholder="Responde aquí la pregunta"
          />
          <ButtonWrapper>
            <Button onClick={enviar}>Enviar</Button>
          </ButtonWrapper>
        </form>
      )}
    </>
  );
};

export const P = styled.p`
  font-size: 24px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;

  @media screen and (min-width: 900px) {
    justify-content: end;
  }
`;

const Wrapper = styled.div`
  width: 80%;

  margin-bottom: 16px;
`;

const BreadCrumbs = styled.div`
  text-align: left;

  font-weight: 600;
  font-size: 24px;
`;

export const TextArea = styled.textarea`
  background-color: ${colors.azulClaro}4d;
  border: 2px solid transparent;
  border-radius: 5px;
  margin-bottom: 16px;

  @media screen and (min-width: 900px) {
    width: 600px;
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
