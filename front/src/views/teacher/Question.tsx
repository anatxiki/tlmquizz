import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Loader } from "../../_components/Loader";
import { colors } from "../../theme";
import { ReactModal } from "../../_components/Modal";
import crossIcon from "../../images/close.png";
import { Button } from "../../_components/Button";
import {
  Wrapper,
  ModalWrapper,
  CloseButton,
  ButtonWrapper,
  BreadcCrumbsWrapper,
  BreadCrumbs,
  Titulo,
  Container,
  RespuestaWrapper,
  UserWrapper,
  LoaderWrapper,
  DateWrapper,
  Respuestas,
  Resultados,
  PWrapper,
} from "./Question.styles";
import { getRooms } from "../../domain/services/getRooms";
import { getAnswers } from "../../domain/services/getAnswers";
import { getPreguntas } from "../../domain/services/getPreguntas";
import { closeQuestion } from "../../domain/services/closeQuestion";
import { Notification } from "../../_components/Notification";

export const Question: FC = () => {
  const { id, idQuestion } = useParams();
  const navigate = useNavigate();
  const [isModalCerrarPreguntaOpen, setIsModalCerrarPreguntaOpen] =
    useState(false);
  const [myRoom, setRoom] = useState<any | undefined>(undefined);
  const [myPregunta, setPregunta] = useState<any>(undefined);
  const [respuestas, setRespuestas] = useState<any>(undefined);
  const [segundos, setSegundos] = useState<any>(0);

  const updateAnswers = () => {
    getAnswers(myPregunta.id).then(setRespuestas);
  };

  const onLoad = async () => {
    const rooms = await getRooms();
    const room = rooms.find((room: any) => room.id.toString() === id);
    if (room === undefined) {
      navigate(`/teacher/rooms`);
      return;
    }

    const preguntas = await getPreguntas(room.id);
    const pregunta = preguntas.find(
      (pregunta: any) => pregunta.id.toString() === idQuestion
    );
    if (pregunta === undefined) {
      navigate(`teacher/rooms/${room.id}`);
      return;
    }

    setRoom(room);
    setPregunta(pregunta);
  };

  useEffect(() => {
    onLoad();
  }, []);

  useEffect(() => {
    if (myPregunta === undefined) return;
    updateAnswers();

    if (myPregunta.is_closed) return;
    const interval = setInterval(updateAnswers, 5000);
    return () => clearInterval(interval);
  }, [myPregunta]);

  useEffect(() => {
    if (myPregunta === undefined || myPregunta.is_closed) return;
    function incrementSeconds() {
      setSegundos(segundos + 1);
    }
    const interval = setInterval(incrementSeconds, 1000);
    return () => clearInterval(interval);
  }, [segundos, myPregunta]);

  const openCerrarPreguntaModal = () => {
    setIsModalCerrarPreguntaOpen(true);
  };

  const closeCerrarPreguntaModal = () => {
    setIsModalCerrarPreguntaOpen(false);
  };

  const cerrarPregunta = () => {
    closeQuestion(idQuestion!);
    setPregunta({ ...myPregunta, is_closed: true });
    closeCerrarPreguntaModal();
  };

  const isLoading =
    myRoom === undefined ||
    myPregunta === undefined ||
    respuestas === undefined;

  return (
    <Wrapper>
      <ReactModal
        isOpened={isModalCerrarPreguntaOpen}
        onClose={closeCerrarPreguntaModal}
      >
        <ModalWrapper>
          <CloseButton src={crossIcon} onClick={closeCerrarPreguntaModal} />
          <h2>Cerrar pregunta</h2>

          <p>
            Vas a cerrar la pregunta. No se aceptarán respuestas nuevas. A los
            estudiantes conectados se les enviará automáticamente la respuesta
            con lo que tengan escrito.
          </p>
          <p>¿Seguro que quieres cerrar la pregunta?</p>
          <ButtonWrapper>
            <Button color={colors.rojo} onClick={cerrarPregunta}>
              Cerrar pregunta
            </Button>
          </ButtonWrapper>
        </ModalWrapper>
      </ReactModal>

      {isLoading ? (
        <LoaderWrapper>
          <Loader width={120} />
        </LoaderWrapper>
      ) : (
        <>
          <BreadcCrumbsWrapper>
            <BreadCrumbs>
              Mis salas {">"} {myRoom !== undefined && myRoom.name}
            </BreadCrumbs>
          </BreadcCrumbsWrapper>

          <Titulo>{myPregunta !== undefined && myPregunta.title}</Titulo>

          <Container>
            <Respuestas>
              {respuestas.length === 0 && myPregunta.is_closed ? (
                <Notification type="info">No hay respuestas</Notification>
              ) : (
                respuestas.map((respuesta: any) => (
                  <RespuestaWrapper key={respuesta.id}>
                    <UserWrapper>
                      <strong>{respuesta.email.split("@")[0]} </strong>
                      <DateWrapper>
                        {respuesta.ts.split(".")[0].split(" ")[1]}
                      </DateWrapper>
                    </UserWrapper>
                    {respuesta.response}
                  </RespuestaWrapper>
                ))
              )}
              {!myPregunta.is_closed && (
                <LoaderWrapper>
                  <Loader width={40} />
                </LoaderWrapper>
              )}
            </Respuestas>
            <Resultados>
              {myPregunta.is_closed ? (
                <p>Finalizado</p>
              ) : (
                <p>En curso... {segundos}s</p>
              )}
              <PWrapper>
                {respuestas.length} respuestas
                <br />
                /? conectados
              </PWrapper>
              <PWrapper>
                ? conectados
                <br />
                /? en la sala
              </PWrapper>
            </Resultados>
          </Container>

          {myPregunta !== undefined &&
            (!myPregunta.is_closed ? (
              <Button color={colors.rojo} onClick={openCerrarPreguntaModal}>
                Cerrar pregunta
              </Button>
            ) : (
              <Button onClick={() => navigate(`/teacher/rooms/${id}`)}>
                Volver
              </Button>
            ))}
        </>
      )}
    </Wrapper>
  );
};
