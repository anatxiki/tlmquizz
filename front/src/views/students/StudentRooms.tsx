import { FC, useEffect, useState } from "react";
import { Button } from "../../_components/Button";
import { Notification } from "../../_components/Notification";
import { Loader } from "../../_components/Loader";
import { ReactModal } from "../../_components/Modal";
import crossIcon from "../../images/close.png";
import logoutIcon from "../../images/logout.png";
import {
  ActionButton,
  ButtonWrapper,
  CloseButton,
  Container,
  FormWrapper,
  IconButton,
  Label,
  LeaveRoom,
  ModalWrapper,
  P,
  Row,
  Table,
  Titulo,
  Wrapper,
} from "./StudentRooms.styles";
import { Input } from "../../_components/Input";
import { Link } from "../../_components/Link";
import { getRooms } from "../../domain/services/getRooms";
import { joinRoom } from "../../domain/services/joinRoom";
import { leaveRoom } from "../../domain/services/leaveRoom";

export const StudentRooms: FC = () => {
  const [isModalUnirSalaOpen, setIsModalUnirSalaOpen] = useState(false);
  const [isModalDejarSalaOpen, setIsModalDejarSalaOpen] = useState(false);
  const [chosenRoom, setChosenRoom] = useState<any>({});

  const [roomCode, setRoomCode] = useState("");
  const [rooms, setRooms] = useState<any[] | undefined>(undefined);

  function updateRooms() {
    getRooms().then(setRooms);
  }

  useEffect(() => {
    updateRooms();
  }, []);

  if (rooms === undefined) {
    return <Loader />;
  }

  const openUnirSalaModal = () => {
    setIsModalUnirSalaOpen(true);
  };

  const closeUnirSalaModal = () => {
    setIsModalUnirSalaOpen(false);
  };

  const unirSala = () => {
    // join room
    joinRoom(roomCode);
    updateRooms();
    closeUnirSalaModal();
  };

  const openDejarSalaModal = (room: any) => {
    setChosenRoom(room);
    setIsModalDejarSalaOpen(true);
  };

  const closeDejarSalaModal = () => {
    setIsModalDejarSalaOpen(false);
  };

  const dejarSala = async () => {
    // delete room
    await leaveRoom(chosenRoom.id);
    updateRooms();
    closeDejarSalaModal();
  };

  const noHaySalas = rooms.length === 0;

  return (
    <Wrapper>
      <ReactModal isOpened={isModalUnirSalaOpen} onClose={closeUnirSalaModal}>
        <ModalWrapper>
          <CloseButton src={crossIcon} onClick={closeUnirSalaModal} />
          <h2>Añadir sala</h2>

          <FormWrapper>
            <Label htmlFor="roomCode">Código de la sala</Label>

            <Input
              name="roomCode"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value)}
            />
          </FormWrapper>

          <ButtonWrapper>
            <Button onClick={unirSala} ariaDisabled={roomCode === ""}>
              Añadir sala
            </Button>
          </ButtonWrapper>
        </ModalWrapper>
      </ReactModal>

      <ReactModal isOpened={isModalDejarSalaOpen} onClose={closeDejarSalaModal}>
        <ModalWrapper>
          <CloseButton src={crossIcon} onClick={closeDejarSalaModal} />
          <h2>Dejar sala</h2>
          <p>
            Vas a irte de la sala <strong>{chosenRoom.name}</strong>. Ya no
            podrás responder a más preguntas de esta sala.
          </p>
          <p>¿Seguro que quieres dejar la sala?</p>
          <ButtonWrapper>
            <Button onClick={dejarSala}>Dejar sala</Button>
          </ButtonWrapper>
        </ModalWrapper>
      </ReactModal>

      <Titulo>Mis salas</Titulo>

      <Container>
        {noHaySalas ? (
          <Notification>
            <P>
              No estás unido a ninguna sala. Únete a tu primera sala para poder
              responder preguntas.
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
                      <Link to={`/rooms/${room.id}`}>{room.name}</Link>
                    </Row>
                    <ActionButton>
                      <IconButton
                        aria-labelledby="leave-label"
                        onClick={() => {
                          openDejarSalaModal(room);
                        }}
                      >
                        <LeaveRoom src={logoutIcon} />
                        <span id="leave-label" hidden>
                          Abandonar sala
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
      <Button onClick={openUnirSalaModal}>Unirse a una sala</Button>
    </Wrapper>
  );
};
