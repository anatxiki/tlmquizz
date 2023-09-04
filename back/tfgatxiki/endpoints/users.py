from flask import Blueprint, request, Response
from tfgatxiki.services.session import init_session, get_session, terminate_session
import json


def users(user_service):
    bp = Blueprint('users', __name__)

    @bp.get('/session')
    def _session():
        user_session = get_session()
        if user_session is None:
            return Response(status=200, response=json.dumps({}))
        return Response(status=200, response=json.dumps(user_session))

    @bp.post('/login')
    def _login():
        data = request.json
        print(data)
        email = data['email']
        passwd = data['passwd']

        user = user_service.get_user(email, passwd)
        if user is None:
            return Response(status=401)

        init_session(user['email'], user['id'], user['is_teacher'])
        return Response(status=200, response=json.dumps(get_session()))

    @bp.post('/register')
    def _register():
        data = request.json
        email = data['email']
        passwd = data['passwd']
        is_teacher = data['rol'] == 'teacher'

        user = user_service.create_user(email, passwd, is_teacher)
        if user is None:
            return Response(status=400)

        init_session(user['email'], user['id'], user['is_teacher'])
        return Response(status=204)

    @bp.post('/logout')
    def _logout():
        terminate_session()
        return Response(status=204)

    return bp
