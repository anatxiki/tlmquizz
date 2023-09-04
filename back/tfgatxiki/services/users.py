import logging
import hashlib

def hash_passwd(passwd: str) -> str:
	return hashlib.sha512(passwd.encode('utf-8')).hexdigest()


class UserService:
	def __init__(self, repository):
		self.repository = repository

	def get_user(self, email: str, passwd: str):
		return self.repository.get_user(email, hash_passwd(passwd))

	def create_user(self, email: str, passwd: str, is_teacher: bool):
		try:
			success = self.repository.create_user(email, hash_passwd(passwd), is_teacher)
			if not success: return None
			return self.repository.get_user(email, hash_passwd(passwd))
		except Exception as e:
			logging.error(f'Error in create_user: {e}')
			return None
