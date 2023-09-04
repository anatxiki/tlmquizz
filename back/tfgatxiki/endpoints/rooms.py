from flask import Blueprint, Response, request
import json

from tfgatxiki.services.session import get_current_user
from tfgatxiki.services.rooms import RoomService


def rooms(room_service: RoomService):
    bp = Blueprint('rooms', __name__)

    @bp.get('/rooms')
    def _rooms():
        user = get_current_user()
        if user is None:
            return Response(status=403)

        rooms = room_service.get_rooms(user['id'], user['is_teacher'])
        return Response(status=200, response=json.dumps(rooms))

    @bp.post('/teacher/create-room')
    def _create_room():
        user = get_current_user()
        if user is None or user['is_teacher'] == False:
            return Response(status=403)

        room_name = request.json['roomName']
        room_service.create_room(user['id'], room_name)
        return Response(status=204)

    @bp.post('/teacher/delete-room')
    def _delete_room():
        user = get_current_user()
        if user is None or user['is_teacher'] == False:
            return Response(status=403)

        room_id = request.json['id']
        room_service.delete_room(int(room_id))
        return Response(status=204)

    @bp.post('/join-room')
    def _join_room():
        user = get_current_user()
        if user is None or user['is_teacher'] == True:
            return Response(status=403)

        room_id = request.json['roomCode']
        room_service.join_room(int(room_id), user['id'])
        return Response(status=204)

    @bp.post('/leave-room')
    def _leave_room():
        user = get_current_user()
        if user is None or user['is_teacher'] == True:
            return Response(status=403)

        room_id = request.json['roomCode']
        room_service.leave_room(int(room_id), user['id'])
        return Response(status=204)
    return bp
