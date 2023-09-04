from flask import session

def init_session(email: str, user_id: int, is_teacher: bool):
	session['user'] = {
		'id'   : user_id,
		'email': email,
		'is_teacher': is_teacher,
	}
	session['last_path'] = None
	session.permanent = True

def terminate_session():
	session.clear()

def update_last_path(last_path: str):
	session['last_path'] = last_path

def get_session():
	user = session.get('user', None)
	if user is None: return None
	return {'user': user, 'last_path': session.get('last_path', None)}

def get_current_user():
	return session.get('user', None)
