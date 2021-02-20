class User:
    user_id: int
    username: str
    email: str

    def __init__(self, user_id: int, username: str, email: str):
        self.user_id = user_id
        self.username = username
        self.email = email

    @classmethod
    def from_row(cls, row):
        return cls(
            user_id=int(row["user_id"]),
            username=row["username"],
            email=row["email"]
        )
