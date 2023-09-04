import { myApi } from "../../myApi";

export const createRoom = async (roomName: string) => {
  const response = await myApi.post("/teacher/create-room", {
    roomName: roomName,
  });
  return response;
};
