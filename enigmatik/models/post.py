from enigmatik.config.mysqlconnection import connectToMySQL
from enigma.machine import EnigmaMachine
from enigmatik.models.user import User
from enigmatik.models.dec_post import Decr_post
from enigmatik.models.dec_post import Decr_post2
from enigmatik.models.enc_post import Enc_post
from flask import session


class Post:
    def __init__(self, data):
        self.user_id = data['user_id']
        self.decrypted_title = data['decrypted_title']
        # self.decrypted_title = " ".join(data['decrypted_title'][i : i + 4] for i in range(0, len(data['decrypted_title']), 4))
        self.decrypted_message = data['decrypted_message']
        # self.decrypted_message = " ".join(data['decrypted_message'][i : i + 4] for i in range(0, len(data['decrypted_message']), 4))
        self.encrypt_title_bool = data['encrypt_title_bool']
        self.viewed_by = data['viewed_by']
        self.rotor_order = data['rotor_order']
        self.initial_position = data['initial_position'].replace(' ', '')
        self.rings = data['rings']
        self.key_swap_pairs = data['key_swap_pairs'].replace(',', '')
        if 'id' in data:
            self.id = data['id']
        if 'encrypted_title' in data:
            self.encrypted_title = data['encrypted_title']
            # self.encrypted_title = " ".join(data['encrypted_title'][i : i + 4] for i in range(0, len(data['encrypted_title']), 4))
        if 'encrypted_message' in data:
            self.encrypted_message = data['encrypted_message']
            # self.encrypted_message = " ".join(data['encrypted_message'][i : i + 4] for i in range(0, len(data['encrypted_message']), 4))
        if 'created_at' in data:
            self.created_at = data['created_at']

    @classmethod
    def submit_post(cls, data):
        # data = {
        #     **data,
        #     'user_id': session['user_id']
        # }
        new_post = cls(data)

        # make a new machine from post data and encrypt title
        machine = EnigmaMachine.from_key_sheet(rotors=new_post.rotor_order, reflector='B', ring_settings=new_post.rings, plugboard_settings=new_post.key_swap_pairs)
        machine.set_display(new_post.initial_position)
        encrypted_title = machine.process_text(new_post.decrypted_title, replace_char='X')

        # reset starting position then encrypt message
        machine.set_display(new_post.initial_position)
        encrypted_message = machine.process_text(new_post.decrypted_message, replace_char='X')
        data = {
            **data,
            'encrypted_title': encrypted_title,
            'encrypted_message': encrypted_message,
            'key_swap_pairs': new_post.key_swap_pairs,
            'initial_position': new_post.initial_position
        }

        query = '''INSERT INTO posts SET encrypted_title=%(encrypted_title)s, encrypted_message=%(encrypted_message)s,
                decrypted_title=%(decrypted_title)s, decrypted_message=%(decrypted_message)s,
                encrypt_title_bool=%(encrypt_title_bool)s, rotor_order=%(rotor_order)s, initial_position=%(initial_position)s,
                rings=%(rings)s, key_swap_pairs=%(key_swap_pairs)s, user_id=%(user_id)s, viewed_by=%(viewed_by)s
                '''
        return connectToMySQL('enigmatik').query_db(query, data)
    
    @classmethod
    def get_all_posts(cls):
        query = 'SELECT * FROM posts JOIN users ON posts.user_id = users.id'
        results = connectToMySQL('enigmatik').query_db(query)
        rev_results = results[::-1]

        all_posts = []

        for row in rev_results:
            new_post = cls(row)
            user_info = {
                **row,
                'id': row['user_id']
            }
            enc = Enc_post(row)
            new_post.enc = enc
            new_user = User(user_info)
            new_post.user = new_user
            all_posts.append(new_post)
        
        return all_posts

    @classmethod
    def get_one_post(cls, id):
        data = {
            'id': id
        }
        query = 'SELECT * FROM posts JOIN users ON posts.user_id = users.id WHERE posts.id = %(id)s'

        results = connectToMySQL('enigmatik').query_db(query, data)
        if results:
            new_post = cls(results[0])

            user_info = {
                    **results[0],
                    'id': results[0]['user_id']
                }
            
            new_user = User(user_info)
            new_post.user = new_user

            return new_post
        
    @classmethod
    def decrypt_message(cls, data):
       
        post = cls.get_one_post(data['post_id'])
        # guess = cls(data)
        print(data)
        key_swap_pairs = data['key_swap_pairs'].replace(',', '')
        initial_position = data['initial_position'].replace(' ', '')

        # make a new machine from post data and encrypt title
        # machine = EnigmaMachine.from_key_sheet(rotors=post.rotor_order, reflector='B', ring_settings=post.rings, plugboard_settings=post.key_swap_pairs)
        machine = EnigmaMachine.from_key_sheet(rotors=data['rotor_order'], reflector='B', ring_settings=data['rings'], plugboard_settings=key_swap_pairs)
        machine.set_display(initial_position)
        # encrypted_title = machine.process_text(post.decrypted_title, replace_char='X')
        decrypted_title = machine.process_text(post.encrypted_title)

        # reset starting position then encrypt message
        machine.set_display(initial_position)
        # decrypted_message = machine.process_text(post.encrypted_message, replace_char='X')
        decrypted_message = machine.process_text(post.encrypted_message)
        print(' decrypted title is ', decrypted_title, ' decrypted message is ', decrypted_message)
        print(' post decrypted title is ', post.decrypted_title, ' post decrypted message is ', post.decrypted_message)
        print('dec title', decrypted_title.replace('X','').upper())
        print('post dec title', post.decrypted_title.replace(' ','').replace('X','').upper())
        if decrypted_title.replace('X','').upper() == post.decrypted_title.replace(' ','').replace('X','').upper():
            decrypted_title = post.decrypted_title
            decrypted_message = post.decrypted_message
        data = {
            'decrypted_title': decrypted_title,
            'decrypted_message': decrypted_message,
        }
        if decrypted_title.replace(' ','') == post.decrypted_title.replace(' ',''):
            decrypted_post = Decr_post2(data)
        else:
            decrypted_post = Decr_post(data)
        encrypted = {
            'encrypted_title': post.encrypted_title,
            'encrypted_message': post.encrypted_message,
        }
        encrypted_post = Enc_post(encrypted)
        print(decrypted_post.decrypted_title)
        post.decrypted = decrypted_post
        post.encrypted = encrypted_post
        
        return post