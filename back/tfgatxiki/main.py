import logging
from uuid import uuid4
from flask import Flask

from tfgatxiki.repositories.sqlite import SqliteRepository
from tfgatxiki.services.users import UserService
from tfgatxiki.endpoints.users import users

from tfgatxiki.services.rooms import RoomService
from tfgatxiki.endpoints.rooms import rooms
from tfgatxiki.services.questions import QuestionService
from tfgatxiki.endpoints.questions import questions
from tfgatxiki.services.answers import AnswerService
from tfgatxiki.endpoints.answers import answers


def main():
    logging.basicConfig(level=logging.INFO)

    repository = SqliteRepository('tlmquiz.db')
    user_service = UserService(repository)
    room_service = RoomService(repository)
    question_service = QuestionService(repository)
    answer_service = AnswerService(repository)

    app = Flask('tlmquizz')
    app.secret_key = uuid4().hex

    app.register_blueprint(users(user_service))
    app.register_blueprint(rooms(room_service))
    app.register_blueprint(questions(question_service))
    app.register_blueprint(answers(answer_service))

    app.run(host='127.0.0.1', port=5000)
