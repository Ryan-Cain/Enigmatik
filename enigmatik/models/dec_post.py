class Decr_post:
    def __init__(self, data):
        # self.decrypted_title = data['decrypted_title']
        self.decrypted_title = " ".join(data['decrypted_title'][i : i + 4] for i in range(0, len(data['decrypted_title']), 4))
        # self.decrypted_message = data['decrypted_message']
        self.decrypted_message = " ".join(data['decrypted_message'][i : i + 4] for i in range(0, len(data['decrypted_message']), 4))
        print('dec1 ran')
      


class Decr_post2:
    def __init__(self, data):
        self.decrypted_title = data['decrypted_title'].upper()
        self.decrypted_message = data['decrypted_message'].upper()
        print('dec2 ran')