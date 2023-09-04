class QuestionService:
    def __init__(self, repository):
        self.repository = repository

    def get_questions(self, room_id: int):
        return self.repository.get_questions(room_id)

    def get_pending_question(self, room_id: int, user_id: int):
        return self.repository.get_pending_question(room_id, user_id)

    def create_question(self, user_id: int, room_name: str):
        return self.repository.create_question(user_id, room_name)

    def delete_question(self, room_id: int):
        return self.repository.delete_question(room_id)

    def close_question(self, question_id: int):
        return self.repository.close_question(question_id)
