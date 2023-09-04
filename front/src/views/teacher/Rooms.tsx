import { FC, useEffect, useState } from "react";
import { Button } from "../../_components/Button";
import { Notification } from "../../_components/Notification";
import { Loader } from "../../_components/Loader";
import { ReactModal } from "../../_components/Modal";
import { Input } from "../../_components/Input";
import crossIcon from "../../images/close.png";
import trash from "../../images/trash.png";
import {
  ActionButton,
  ButtonWrapper,
  CloseButton,
  Container,
  FormWrapper,
  IconButton,
  Label,
  ModalWrapper,
  P,
  Row,
  Table,
  Titulo,
  Trash,
  Wrapper,
} from "./Rooms.styles";
import { Link } from "../../_components/Link";
import { colors } from "../../theme";
import { getRooms } from "../../domain/services/getRooms";
import { Room } from "../../domain/models/Room";
import { createRoom } from "../../domain/services/createRoom";
import { deleteRoom } from "../../domain/services/deleteRoom";

export const Rooms: FC = () => {
  const [isModalCrearSalaOpen, setIsModalCrearSalaOpen] = useState(false);
  const [isModalBorrarSalaOpen, setIsModalBorrarSalaOpen] = useState(false);
  const [chosenRoom, setChosenRoom] = useState<any>({});

  const [roomName, setRoomName] = useState("");
  const [rooms, setRooms] = useState<Room[] | undefined>(undefined);

  function onLoad() {
    getRooms().then(setRooms);
  }

  useEffect(() => {
    onLoad();
  }, []);

  if (rooms === undefined) {
    return <Loader />;
  }

  const openCrearSalaModal = () => {
    setIsModalCrearSalaOpen(true);
  };

  const closeCrearSalaModal = () => {
    setIsModalCrearSalaOpen(false);
  };

  const onCrearSala = async (name: string) => {
    // create room
    await createRoom(name);
    onLoad();
    closeCrearSalaModal();
  };

  const openBorrarSalaModal = (room: any) => {
    setChosenRoom(room);
    setIsModalBorrarSalaOpen(true);
  };

  const closeBorrarSalaModal = () => {
    setIsModalBorrarSalaOpen(false);
  };

  const onBorrarSala = async (id: string) => {
    // delete room
    await deleteRoom(id);
    onLoad();
    closeBorrarSalaModal();
  };

  const noHaySalas = rooms.length === 0;

  return (
    <Wrapper>
      <ReactModal isOpened={isModalCrearSalaOpen} onClose={closeCrearSalaModal}>
        <ModalWrapper>
          <CloseButton src={crossIcon} onClick={closeCrearSalaModal} />
          <h2>Crear sala</h2>

          <FormWrapper>
            <Label htmlFor="roomName">Nombre de la sala</Label>

            <Input
              name="roomName"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
            />
          </FormWrapper>

          <ButtonWrapper>
            <Button
              onClick={() => onCrearSala(roomName)}
              ariaDisabled={roomName === ""}
            >
              Crear sala
            </Button>
          </ButtonWrapper>
        </ModalWrapper>
      </ReactModal>

      <ReactModal
        isOpened={isModalBorrarSalaOpen}
        onClose={closeBorrarSalaModal}
      >
        <ModalWrapper>
          <CloseButton src={crossIcon} onClick={closeBorrarSalaModal} />
          <h2>Borrar sala</h2>
          <p>
            Vas a borrar la sala <strong>{chosenRoom.name}</strong>. Se perderán
            todas las preguntas relacionadas y no podrás acceder a los
            resultados.
          </p>
          <p>¿Seguro que quieres borrar la sala?</p>
          <ButtonWrapper>
            <Button
              color={colors.rojo}
              onClick={() => onBorrarSala(chosenRoom.id)}
            >
              Eliminar sala
            </Button>
          </ButtonWrapper>
        </ModalWrapper>
      </ReactModal>

      <Titulo>Mis salas</Titulo>

      <Container>
        {noHaySalas ? (
          <Notification>
            <P>
              No tienes ninguna sala creada. Crea tu primera sala para poder
              hacer preguntas.
            </P>
          </Notification>
        ) : (
          <Table>
            <thead></thead>
            <tbody>
              {rooms.map((room) => {
                return (
                  <tr key={room.id}>
                    <Row>
                      <Link to={`/teacher/rooms/${room.id}`}>{room.name}</Link>
                    </Row>
                    <ActionButton>
                      <IconButton
                        aria-labelledby="trash-label"
                        onClick={() => openBorrarSalaModal(room)}
                      >
                        <Trash src={trash} />
                        <span id="trash-label" hidden>
                          Ver resultados
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

      <Button onClick={openCrearSalaModal}>Crear sala</Button>
    </Wrapper>
  );
};
