import { myApi } from "../../myApi";

export const getPregunta = async (roomId: string) => {
  const pregunta = await myApi.get(`/${roomId}/question`);
  return pregunta === null ? undefined : pregunta;
};
