import { myApi } from "../../myApi";

export const joinRoom = async (roomCode: string) => {
  return myApi.post("/join-room", { roomCode: roomCode });
};
