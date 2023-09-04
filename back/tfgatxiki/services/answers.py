class AnswerService:
    def __init__(self, repository):
        self.repository = repository

    def get_answers(self, question_id: int):
        return self.repository.get_answers(question_id)

    def send_answer(self, question_id: int,answer: str, user_id: int):
        return self.repository.send_answer(question_id, answer, user_id)
