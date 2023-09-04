import { myApi } from "../../myApi";

export const closeQuestion = async (idQuestion: string) => {
  return myApi.post("/teacher/close-question", {
    id: idQuestion,
  });
};
