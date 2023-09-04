import { myApi } from "../../myApi";

export const createQuestion = async (roomId: string, questionTitle: string) => {
  const response = await myApi.post("/teacher/create-question", {
    roomId: roomId,
    questionTitle: questionTitle,
  });
  return response.json();
};
