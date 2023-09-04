import { myApi } from "../../myApi";

export const getAnswers = async (questionId: string) => {
  const answers = await myApi.get(`/question/${questionId}`);
  return answers;
};
