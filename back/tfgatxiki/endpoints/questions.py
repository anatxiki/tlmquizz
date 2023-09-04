from flask import Blueprint, Response, request
import json
import datetime

from tfgatxiki.services.session import get_current_user
from tfgatxiki.services.questions import QuestionService


def questions(question_service: QuestionService):
    bp = Blueprint('questions', __name__)

    @bp.get('/<string:room_id>/questions')
    def _questions(room_id: str):
        user = get_current_user()
        if user is None:
            return Response(status=403)

        questions = question_service.get_questions(int(room_id))
        return Response(status=200, response=json.dumps(questions, default=str))

    @bp.get('/<string:room_id>/question')
    def _question(room_id: str):
        user = get_current_user()
        if user is None:
            return Response(status=403)

        question = question_service.get_pending_question(
            int(room_id), user['id'])
        return Response(status=200, response=json.dumps(question,default=str))

    @bp.post('/teacher/create-question')
    def _create_question():
        user = get_current_user()
        if user is None or user['is_teacher'] == False:
            return Response(status=403)

        room_id = request.json['roomId']
        question_title = request.json['questionTitle']
        if len(question_title) == 0:
            question_title = datetime.datetime.now().strftime('%Y-%m-%d %H:%M')

        question_id = question_service.create_question(
            question_title, int(room_id))
        return Response(status=200, response=json.dumps({'id': question_id}))

    @ bp.post('/teacher/delete-question')
    def _delete_question():
        user = get_current_user()
        if user is None or user['is_teacher'] == False:
            return Response(status=403)

        question_id = request.json['id']
        question_service.delete_question(int(question_id))
        return Response(status=204)

    @bp.post('/teacher/close-question')
    def _close_question():
        user = get_current_user()
        if user is None or user['is_teacher'] == False:
            return Response(status=403)

        question_id = request.json['id']
        question_service.close_question(int(question_id))
        return Response(status=204)

    return bp
