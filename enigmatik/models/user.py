from enigmatik.config.mysqlconnection import connectToMySQL
from flask import flash
import re

EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$') 

class User:
    def __init__(self, data):
        self.id = data['id']
        self.first_name = data['first_name']
        self.last_name = data['last_name']
        self.email = data['email']
        self.password = data['password']

    @classmethod
    def user_exists(cls, email):
        data = {
            'email': email
        }
        query = 'SELECT * FROM users WHERE users.email = %(email)s'
        results = connectToMySQL('enigmatik').query_db(query, data)
        print(results)
        if len(results) < 1:
            return False
        return cls(results[0])
    
    @classmethod
    def register_user(cls, data):
        query = 'INSERT INTO users (first_name, last_name, email, password) VALUES (%(first_name)s, %(last_name)s, %(email)s, %(password)s)'
        return connectToMySQL('enigmatik').query_db(query, data)
    
    @classmethod
    def email_exists(cls, email):
        data = {
            'email': email
        }
        query = 'SELECT * FROM users WHERE users.email = %(email)s'
        results = connectToMySQL('enigmatik').query_db(query, data)
        if results:
            return True
        else:
            return False
    

    @staticmethod
    def validated(user):
        is_valid = True

        if not EMAIL_REGEX.match(user['email']):
            flash('Please enter a valid email address', 'email')
            is_valid = False

        if User.email_exists(user['email']):
            flash('This email is already in use', 'exists')
            is_valid = False  

        if len(user['first_name']) < 2:
            flash('First Name must be at least 2 Characters', 'first_name')
            is_valid = False

        if len(user['last_name']) < 2:
            flash('Last Name must be at least 2 Characters', 'last_name')
            is_valid = False

        if len(user['password']) < 8:
            flash('Password must be at least 8 Characters', 'password')
            is_valid = False

        if user['password'] != user['confirm_password']:
            flash('Passwords must match', 'confirm')
            is_valid = False

        return is_valid