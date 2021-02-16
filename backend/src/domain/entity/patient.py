

class Patient:

    patient_id: int
    cpf: int
    name: str
    details: str
    email: str
    phone: int
    address: str
    cep: int
    cns: int

    def __init__(self, patient_id: int, cpf: int, name: str, details: str,
                 email: str, phone: int, address: str, cep: int, cns: int):
        self.patient_id = patient_id
        self.cpf = cpf
        self.name = name
        self.details = details
        self.email = email
        self.phone = phone
        self.address = address
        self.cep = cep
        self.cns = cns

    @classmethod
    def from_row(cls, row):
        return cls(
            row['patient_id'],
            row['cpf'],
            row['name'],
            row['details'],
            row['email'],
            row['phone'],
            row['address'],
            row['cep'],
            row['cns']
        )
