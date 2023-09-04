import { myApi } from "../../myApi";

export const getPreguntas = async (roomId: string) => {
  const questions = await myApi.get(`/${roomId}/questions`);
  return questions;
};
