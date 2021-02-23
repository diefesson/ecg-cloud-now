class User:
    user_id: int
    username: str
    email: str
    name: str
    phone: str
    type: int
    id_doc: str
    state: str
    city: str
    district: str
    address: str

    def __init__(self, username: str, email: str, name: str, phone: str,
                 type: int, id_doc: str, state: str, city: str,
                 district: str, address: str, user_id: int = None
                 ):
        self.user_id = user_id
        self.username = username
        self.email = email
        self.name = name
        self.phone = phone
        self.type = type
        self.id_doc = id_doc
        self.state = state
        self.city = city
        self.district = district
        self.address = address

    @classmethod
    def from_row(cls, row):
        return cls(
            user_id=row["user_id"],
            username=row["username"],
            email=row["email"],
            name=row["name"],
            phone=row["phone"],
            type=row["type"],
            id_doc=row["id_doc"],
            state=row["state"],
            city=row["city"],
            district=row["district"],
            address=row["address"],
        )
