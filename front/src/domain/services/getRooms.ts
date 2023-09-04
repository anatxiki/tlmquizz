import { myApi } from "../../myApi";

export const getRooms = async () => {
  const rooms = await myApi.get("/rooms");
  return rooms;
};
