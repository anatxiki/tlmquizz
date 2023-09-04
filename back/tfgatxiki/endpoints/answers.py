from flask import Blueprint, Response, request
import json

from tfgatxiki.services.session import get_current_user
from tfgatxiki.services.answers import AnswerService


def answers(answer_service: AnswerService):
    bp = Blueprint('answers', __name__)

    @bp.get('/question/<string:question_id>')
    def _answers(question_id: str):
        user = get_current_user()
        if user is None or user['is_teacher'] == False:
            return Response(status=403)

        answers = answer_service.get_answers(int(question_id))
        return Response(status=200, response=json.dumps(answers, default=str))

    @bp.post('/<string:question_id>/send-answer')
    def _send_answer(question_id: str):
        user = get_current_user()
        if user is None or user['is_teacher'] == True:
            return Response(status=403)

        answer_service.send_answer(int(question_id), request.json['answer'], user['id'])
        return Response(status=204)

    return bp
