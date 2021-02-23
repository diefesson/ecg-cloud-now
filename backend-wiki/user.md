# User endpoints
## User structure
| field    | type   | required | description                            |
| -------- | ------ | -------- | -------------------------------------- |
| username | string | true     |                                        |
| email    | string | true     |                                        |
| name     | string | true     |                                        |
| phone    | string | true     |                                        |
| type     | int    | true     | 0 for patient, 1 for medic             |
| id_doc   | string | true     | RG for patient, CRM for medic          |
| state    | string | true     | 2 character state abbreviation, eg: CE |
| city     | string | true     |                                        |
| district | string | true     |                                        |
| address  | string | true     |                                        |

## GET user/get/<user_id>
Retrieves the specified user data.

## POST user/create
Creates a new user.

**Request structure**
All the user fields plus the field bellow
| field    | type   | required | description |
| -------- | ------ | -------- | ----------- |
| password | string | true     |             |

**Response structure**
| field   | type    | required | description       |
| ------- | ------- | -------- | ----------------- |
| success | boolean | true     |                   |
| cause   | string  | false    | the failure cause |

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