import sqlite3
import logging
from datetime import datetime

# https://stackoverflow.com/questions/16936608/storing-bools-in-sqlite-database
sqlite3.register_adapter(bool, int)
sqlite3.register_converter("BOOLEAN", lambda v: bool(int(v)))

# https://docs.python.org/3/library/sqlite3.html#how-to-create-and-use-row-factories


def dict_factory(cursor, row):
    fields = [column[0] for column in cursor.description]
    return {key: value for key, value in zip(fields, row)}


class SqliteRepository:
    def __init__(self, dbname: str):
        self.con = sqlite3.connect(
            dbname, detect_types=sqlite3.PARSE_DECLTYPES, check_same_thread=False)
        self.con.row_factory = dict_factory
        self._setup_tables()

    def _setup_tables(self):
        with self.con:
            self.con.execute('PRAGMA foreign_keys = on')
            self.con.execute('''CREATE TABLE IF NOT EXISTS user_qzz (
				id INTEGER PRIMARY KEY AUTOINCREMENT,
				email VARCHAR(100) NOT NULL UNIQUE,
				passwd VARCHAR(100) NOT NULL,
				is_teacher BOOLEAN NOT NULL
			)''')
            self.con.execute('''CREATE TABLE IF NOT EXISTS rooms_qzz (
				id INTEGER PRIMARY KEY AUTOINCREMENT,
				name VARCHAR(100) NOT NULL UNIQUE,
                owner INTEGER NOT NULL,
                FOREIGN KEY (owner) REFERENCES user_qzz(id)
			)''')
            self.con.execute('''CREATE TABLE IF NOT EXISTS questions_qzz (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title VARCHAR(400) NOT NULL,
                room_id INTEGER NOT NULL,
                is_closed BOOLEAN DEFAULT 0,
                ts TIMESTAMP NOT NULL,
                FOREIGN KEY (room_id) REFERENCES rooms_qzz(id) ON DELETE CASCADE
            )''')
            self.con.execute('''CREATE TABLE IF NOT EXISTS answers_qzz (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                response VARCHAR(500) NOT NULL,
                question_id INTEGER NOT NULL,
                user_id INTEGER NOT NULL,
                ts TIMESTAMP NOT NULL,
                FOREIGN KEY (question_id) REFERENCES questions_qzz(id) ON DELETE CASCADE
                FOREIGN KEY (user_id) REFERENCES user_qzz(id)
            )''')
            self.con.execute('''CREATE TABLE IF NOT EXISTS members_qzz (
                room_id INTEGER NOT NULL,
                user_id INTEGER NOT NULL,
                FOREIGN KEY (room_id) REFERENCES rooms_qzz(id) ON DELETE CASCADE
                FOREIGN KEY (user_id) REFERENCES user_qzz(id)
                PRIMARY KEY (room_id, user_id)
            )''')

    # Users
    def create_user(self, email: str, passwd: str, is_teacher: bool):
        logging.info(f'Create user: {email=}, passwd=*****, {is_teacher=}')
        with self.con:
            r = self.con.execute('''insert into user_qzz (email, passwd, is_teacher) values
								 (?    , ?     , ?         )''',
                                 (email, passwd, is_teacher)
                                 )
            return r.rowcount == 1

    def get_user(self, email: str, passwd: str):
        with self.con:
            r = self.con.execute(
                'select * from user_qzz where email=? and passwd=?', (email, passwd))
            return r.fetchone()

    # Rooms
    def get_teacher_rooms(self, user_id: int):
        with self.con:
            r = self.con.execute(
                'select * from rooms_qzz where owner=?', (user_id,))
            return r.fetchall()

    def get_student_rooms(self, user_id: int):
        with self.con:
            r = self.con.execute('''
                select * from rooms_qzz
                join members_qzz on rooms_qzz.id = members_qzz.room_id
                where members_qzz.user_id=?
                ''', (user_id,))
            return r.fetchall()

    def create_room(self, user_id: int, room_name: str):
        with self.con:
            r = self.con.execute('''insert into rooms_qzz (name, owner) values
                                 (?, ?)''', (room_name, user_id))
            return r.rowcount == 1

    def delete_room(self, room_id: int):
        with self.con:
            r = self.con.execute(
                'delete from rooms_qzz where id=?', (room_id,))
            return r.rowcount == 1

    # Questions
    def get_questions(self, room_id: int):
        with self.con:
            r = self.con.execute(
                'select * from questions_qzz where room_id=?', (room_id,))
            return r.fetchall()

    def get_pending_question(self, room_id: int, user_id: int):
        with self.con:
            r = self.con.execute('''
                select * from questions_qzz
                where room_id=? and is_closed=? and not exists (
                    select * from answers_qzz where
                    answers_qzz.question_id=questions_qzz.id and answers_qzz.user_id=?)''',
                                 (room_id, False, user_id))
            return r.fetchone()

    def create_question(self, question_title: str, room_id: int):
        with self.con:
            r = self.con.execute(
                'insert into questions_qzz (title, room_id, ts) values (?,?,?)', (
                    question_title, room_id, datetime.now())
            )
            return r.lastrowid

    def delete_question(self, question_id: int):
        with self.con:
            r = self.con.execute(
                'delete from questions_qzz where id=?', (question_id,))
            return r.rowcount == 1

    def close_question(self, question_id: int):
        with self.con:
            r = self.con.execute(
                'update questions_qzz set is_closed=? where id=?', (
                    True, question_id)
            )
            return r.rowcount == 1

    # Answers
    def get_answers(self, question_id: int):
        with self.con:
            r = self.con.execute('''
                select answers_qzz.id, answers_qzz.response, answers_qzz.ts, user_qzz.email from answers_qzz
                join user_qzz on answers_qzz.user_id = user_qzz.id
                where question_id=?''', (question_id,))
            return r.fetchall()

    def send_answer(self, question_id: int, answer:str, user_id: int):
        with self.con:
            r = self.con.execute('''
                insert into answers_qzz (response, question_id, user_id, ts) 
                values (?, ?, ?, ?)''', (answer, question_id,user_id, datetime.now()))
            return r.fetchall()

    # Members
    def join_room(self, room_id: int, user_id: int):
        with self.con:
            r = self.con.execute('''
                insert into members_qzz (room_id, user_id) values (?,?)''', (
                room_id, user_id))
            return r.rowcount == 1

    def leave_room(self, room_id: int, user_id: int):
        with self.con:
            r = self.con.execute('''
                delete from members_qzz where room_id=? and user_id=?''', (
                room_id, user_id))
            return r.rowcount == 1
