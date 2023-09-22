class Enc_post:
    def __init__(self, data):
        self.encrypted_title = " ".join(data['encrypted_title'][i : i + 4] for i in range(0, len(data['encrypted_title']), 4))
        self.encrypted_message = " ".join(data['encrypted_message'][i : i + 4] for i in range(0, len(data['encrypted_message']), 4))
        print('dec1 ran')