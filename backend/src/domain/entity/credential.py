from hashlib import pbkdf2_hmac

HASH_ALGORITHM = 'sha256'
INTERACTION_COUNT = 10000
OUTPUT_SIZE = 256


class Credential:
    username: str
    password_hash: bytes

    def __init__(self, username: str, password: str or bytes):
        self.username = username

        if isinstance(password, bytes):
            self.password_hash = password
        else:
            self.password_hash = self.calculate_hash(username, password)

    def __eq__(self, other):
        return self.username == other.username and self.password_hash == other.password_hash

    @staticmethod
    def calculate_hash(username: str, password: str):
        return pbkdf2_hmac(hash_name=HASH_ALGORITHM,
                           password=bytes(password, 'utf-8'),
                           salt=bytes(username, 'utf-8'),
                           iterations=INTERACTION_COUNT,
                           dklen=OUTPUT_SIZE)
