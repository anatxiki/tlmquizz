class RoomService:
    def __init__(self, repository):
        self.repository = repository

    def get_rooms(self, user_id: int, is_teacher: bool):
        if is_teacher:
            return self.repository.get_teacher_rooms(user_id)
        else:
            return self.repository.get_student_rooms(user_id)

    def create_room(self, user_id: int, room_name: str):
        return self.repository.create_room(user_id, room_name)

    def delete_room(self, room_id: int):
        return self.repository.delete_room(room_id)

    def join_room(self, room_id: int, user_id: int):
        return self.repository.join_room(room_id, user_id)

    def leave_room(self, room_id: int, user_id: int):
        return self.repository.leave_room(room_id, user_id)
