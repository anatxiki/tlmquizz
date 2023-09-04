import { myApi } from "../../myApi";

export const sendAnswer = async (questionId: string, answer: string) => {
  return myApi.post(`/${questionId}/send-answer`, { answer: answer });
};
