from json import dumps


class Sample:

    sample_id: int
    timestamp: int
    frequency: int
    raw: str

    def __init__(self, sample_id: int, timestamp: int, frequency: int, raw: str):
        self.sample_id = sample_id
        self.timestamp = timestamp
        self.frequency = frequency
        self.raw = raw


def sample_from_row(row) -> Sample:
    sample_id = row['sample_id']
    timestamp = int(row['timestamp'].timestamp())
    frequency = row['frequency']
    raw = row['raw']
    return Sample(sample_id, timestamp, frequency, raw)

