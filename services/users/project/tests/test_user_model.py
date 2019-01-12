import unittest
from project import db
from project.api.models import User
from project.tests.base import BaseTestCase
from sqlalchemy.exc import IntegrityError
from project.tests.utils import add_user


class TestUserModel(BaseTestCase):
    def test_add_user(self):
        user = add_user('justatest', 'test@test.com', 'test')

        self.assertTrue(user.id)
        self.assertEqual(user.username, 'justatest')
        self.assertEqual(user.email, 'test@test.com')
        self.assertTrue(user.active)
        self.assertTrue(user.password)

    def test_add_user_duplicate_username(self):
        add_user('justatest', 'test@test.com', 'greaterthaneight')
        duplicate_user = User(
            username='justatest',
            email='test@tes2.com',
            password='greaterthaneight'
        )
        db.session.add(duplicate_user)
        self.assertRaises(IntegrityError, db.session.commit)

    def test_add_user_duplicate_email(self):
        add_user('justatest', 'test@test.com', 'greaterthaneight')
        duplicate_user = User(
            username='justatest2',
            email='test@test.com',
            password='greaterthaneight'
        )
        db.session.add(duplicate_user)
        self.assertRaises(IntegrityError, db.session.commit)

    def test_to_json(self):
        user = add_user('justatest', 'test@test.com', 'greaterthaneight')
        self.assertTrue(isinstance(user.to_json(), dict))


    def test_passwords_are_random(self):
        user_one = add_user('justatest', 'test@test.com', 'greaterthaneight')
        user_two = add_user('justatest2', 'test@teset2.com', 'greaterthaneight')
        self.assertNotEqual(user_one.password, user_two.password)

if __name__ == '__main__':
    unittest.main()
