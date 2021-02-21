# Sample endpoints

## Sample structure.

| field      | type   | required | description                             |
| ---------- | ------ | -------- | --------------------------------------- |
| sample_id  | int    | true     |                                         |
| patient_id | int    | true     |                                         |
| frequency  | int    | true     | The ECG sampling rate                   |
| raw        | string | true     | Base64 encoded data, one entry per byte |

## GET sample/get/<sample_id>

Retrives the specified sample.

## GET sample/all

Retrieves a list of all samples.

## GET sample/of_patient/<patient_id>

Retrives all the samples of the specified patient.
