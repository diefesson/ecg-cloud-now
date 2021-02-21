# User endpoints
## GET user/get/<user_id>
Retrieves the specified user data.

## POST user/create
Creates a new user.

**Request structure**
| field    | type   | required | description |
| -------- | ------ | -------- | ----------- |
| username | string | true     |             |
| email    | string | true     |             |
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