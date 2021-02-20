# Sample endpoints

## Sample structure.

| field      | type   | required | description                             |
| ---------- | ------ | -------- | --------------------------------------- |
| sample_id  | int    | true     |                                         |
| patient_id | int    | true     |                                         |
| frequency  | int    | true     | The ECG sampling rate                   |
| raw        | string | true     | Base64 encoded data, one entry per byte |

## GET sample/get/<sample_id>

Retrives the specied sample.

## GET sample/all

Retrieves a list of all samples.

## GET sample/of_patient/<patient_id>

Retrives all the samples of the specified patient.

# Patient endpoints

## GET patient/get/<patient_id>

Retrives the specified patient data.

## GET patient/all

Retrives a list of all the patients.

# User endpoints

## GET user/get/<user_id>

Retrieves the specified user data.

## POST user/create

Creates a new user. Returns error 400 if the user already [exists](#post-userhas_user)

**Request structure**

| field    | type   | required | description |
| -------- | ------ | -------- | ----------- |
| username | string | true     |             |
| email    | string | true     |             |
| password | string | true     |             |

### POST user/has_user

Verifies if the user already exists.

**Request structure**

| field    | type   | required | description |
| -------- | ------ | -------- | ----------- |
| username | string | true     |             |
| email    | string | true     |             |

**Response structure**

| field  | type    | required | description                                                        |
| ------ | ------- | -------- | ------------------------------------------------------------------ |
| exists | boolean | true     | True if a user with the specified username or email already exists |