import { myApi } from "../../myApi";

export const deleteRoom = async (roomId: string) => {
  return await myApi.post("/teacher/delete-room", {
    id: roomId,
  });
};
