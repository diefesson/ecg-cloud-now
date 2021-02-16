_PATIENT_FIELDS: str = 'patient_id, cpf, name, details, email, phone, address, cep, cns'
SELECT_ALL_PATIENTS: str = f'select {_PATIENT_FIELDS} from patient'
SELECT_PATIENT: str = f'select {_PATIENT_FIELDS} from patient where patient_id = {{patient_id}}'
SELECT_SAMPLES_OF_PATIENT = 'select * from ecg where patient_id = {patient_id}'
