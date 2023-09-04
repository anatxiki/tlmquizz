import { FC } from "react";
// @ts-ignore
import Modal from "react-modal";

interface Props {
  children: React.ReactNode;
  isOpened: boolean;
  onClose: () => void;
}

// para accesibilidad, si no los lectores no saben que se ha abierto una modal
Modal.setAppElement("#root");

export const ReactModal: FC<Props> = ({ ...props }) => {
  return (
    <Modal
      isOpen={props.isOpened}
      style={{
        content: {
          top: "40%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
        },
      }}
      onRequestClose={props.onClose}
    >
      {props.children}
    </Modal>
  );
};
