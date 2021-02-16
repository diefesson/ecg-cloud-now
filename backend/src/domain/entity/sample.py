class Sample:

    sample_id: int
    patient_id: int
    timestamp: int
    frequency: int
    raw: str

    def __init__(self, sample_id: int, patient_id: int, timestamp: int, frequency: int, raw: str):
        self.sample_id = sample_id
        self.patient_id = patient_id
        self.timestamp = timestamp
        self.frequency = frequency
        self.raw = raw

    @classmethod
    def from_row(cls, row):
        sample_id = row['sample_id']
        patient_id = row['patient_id']
        timestamp = int(row['timestamp'].timestamp())
        frequency = row['frequency']
        raw = row['raw']
        return Sample(sample_id, patient_id, timestamp, frequency, raw)

