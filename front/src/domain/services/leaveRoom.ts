import { myApi } from "../../myApi";

export const leaveRoom = async (roomCode: string) => {
  return await myApi.post("/leave-room", {
    roomCode: roomCode,
  });
};
