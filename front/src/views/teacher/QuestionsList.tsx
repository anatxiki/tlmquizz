import { FC, useEffect, useState } from "react";
import { Loader } from "../../_components/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "../../_components/Link";
import { Notification } from "../../_components/Notification";
import trash from "../../images/trash.png";
import { ReactModal } from "../../_components/Modal";
import crossIcon from "../../images/close.png";
import eyes from "../../images/eyes.png";
import { Button } from "../../_components/Button";
import {
  Wrapper,
  ModalWrapper,
  CloseButton,
  FormWrapper,
  ButtonWrapper,
  BreadcCrumbsWrapper,
  BreadCrumbs,
  Cosas,
  Titulo,
  Container,
  P,
  TextArea,
  Table,
  ActionButton,
  Eyes,
  Trash,
  IconButton,
} from "./QuestionsList.styles";
import { colors } from "../../theme";
import { getRooms } from "../../domain/services/getRooms";
import { getPreguntas } from "../../domain/services/getPreguntas";
import { createQuestion } from "../../domain/services/createQuestion";
import { deleteQuestion } from "../../domain/services/deleteQuestion";

export const QuestionsList: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isModalBorrarPreguntaOpen, setIsModalBorrarPreguntaOpen] =
    useState(false);
  const [isModalCrearPreguntaOpen, setIsModalCrearPreguntaOpen] =
    useState(false);
  const [chosenPregunta, setChosenPregunta] = useState<any>({});
  const [newPregunta, setNewPregunta] = useState("");
  const [preguntas, setPreguntas] = useState<any[] | undefined>(undefined);

  const [myRoom, setRoom] = useState<any>(undefined);

  const onLoad = async () => {
    const rooms = await getRooms();
    const room = rooms.find((room: any) => room.id.toString() === id);

    if (room === undefined) {
      navigate(`/teacher/rooms`);
      return;
    }

    setRoom(room);
    getPreguntas(room.id).then(setPreguntas);
  };

  useEffect(() => {
    onLoad();
  }, []);

  const openCrearPreguntaModal = () => {
    setIsModalCrearPreguntaOpen(true);
  };

  const closeCrearPreguntaModal = () => {
    setIsModalCrearPreguntaOpen(false);
  };

  const crearPregunta = async () => {
    // create question
    const question = await createQuestion(myRoom.id, newPregunta);
    closeCrearPreguntaModal();
    navigate(`/teacher/rooms/${myRoom.id}/question/${question.id}`);
  };

  const openBorrarPreguntaModal = (pregunta: any) => {
    setChosenPregunta(pregunta);
    setIsModalBorrarPreguntaOpen(true);
  };

  const closeBorrarPreguntaModal = () => {
    setIsModalBorrarPreguntaOpen(false);
  };

  const borrarPregunta = async () => {
    // delete room
    await deleteQuestion(chosenPregunta.id);
    onLoad();
    closeBorrarPreguntaModal();
  };

  if (preguntas === undefined) {
    return <Loader width={80} />;
  }

  const noHayPreguntas = preguntas.length === 0;
  return (
    <Wrapper>
      <ReactModal
        isOpened={isModalCrearPreguntaOpen}
        onClose={closeCrearPreguntaModal}
      >
        <ModalWrapper>
          <CloseButton src={crossIcon} onClick={closeCrearPreguntaModal} />
          <h2>Lanzar pregunta</h2>

          <FormWrapper>
            <TextArea
              name="preguntaName"
              rows={4}
              value={newPregunta}
              onChange={(e) => setNewPregunta(e.target.value)}
              placeholder="Formula tu pregunta aquí (opcional)"
            />
          </FormWrapper>

          <ButtonWrapper>
            <Button onClick={crearPregunta}>Lanzar pregunta</Button>
          </ButtonWrapper>
        </ModalWrapper>
      </ReactModal>

      <ReactModal
        isOpened={isModalBorrarPreguntaOpen}
        onClose={closeBorrarPreguntaModal}
      >
        <ModalWrapper>
          <CloseButton src={crossIcon} onClick={closeBorrarPreguntaModal} />
          <h2>Borrar pregunta</h2>

          <p>
            Vas a borrar la pregunta <strong>{chosenPregunta.title}</strong>. Se
            perderán todas las respuestas relacionadas y no podrás acceder a los
            resultados.
          </p>
          <p>¿Seguro que quieres borrar la pregunta?</p>
          <ButtonWrapper>
            <Button color={colors.rojo} onClick={borrarPregunta}>
              Borrar pregunta
            </Button>
          </ButtonWrapper>
        </ModalWrapper>
      </ReactModal>

      <BreadcCrumbsWrapper>
        <BreadCrumbs>
          <Link to="/rooms">Mis salas</Link> {">"} {myRoom.name}
        </BreadCrumbs>
      </BreadcCrumbsWrapper>

      <Cosas>
        <Titulo>Mis preguntas</Titulo>

        <Container>
          {preguntas === undefined ? (
            <Loader />
          ) : noHayPreguntas ? (
            <Notification>
              <P>
                No has creado ninguna pregunta aún. Lanza tu primera pregunta
                desde el botón inferior.
              </P>
            </Notification>
          ) : (
            <Table>
              <thead></thead>
              <tbody>
                {preguntas.map((pregunta) => {
                  return (
                    <tr key={pregunta.id}>
                      <td>
                        <Link
                          to={`/teacher/rooms/${myRoom.id}/question/${pregunta.id}`}
                        >
                          {pregunta.title}
                        </Link>
                      </td>
                      <ActionButton>
                        <IconButton
                          aria-labelledby="eyes-label"
                          onClick={() =>
                            navigate(
                              `/teacher/rooms/${myRoom.id}/question/${pregunta.id}`
                            )
                          }
                        >
                          <Eyes src={eyes} />
                          <span id="eyes-label" hidden>
                            Ver resultados
                          </span>
                        </IconButton>
                        <IconButton
                          aria-labelledby="trash-label"
                          onClick={() => openBorrarPreguntaModal(pregunta)}
                        >
                          <Trash src={trash} />
                          <span id="trash-label" hidden>
                            Borrar pregunta
                          </span>
                        </IconButton>
                      </ActionButton>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          )}
        </Container>

        <Button onClick={openCrearPreguntaModal}>Lanzar pregunta</Button>
      </Cosas>
    </Wrapper>
  );
};
