import { myApi } from "../../myApi";

export const deleteQuestion = async (questionId: string) => {
  return await myApi.post("/teacher/delete-question", {
    id: questionId,
  });
};
