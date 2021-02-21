# Session endpoints
Session is token based and uses the "sessionToken" cookie.

**Session structure**
| field   | type          | required | description                                           |
| ------- | ------------- | -------- | ----------------------------------------------------- |
| token   | string        | true     | a 256 bit base64 encoded used to identify the session |
| user_id | integer       | true     | the user id of the current logged user                |
| expire  | ISO 8061 date | true     | the session expire timestamp                          |

## POST /session/create
Starts a new session

**Request**
| field    | type   | required | description |
| -------- | ------ | -------- | ----------- |
| username | string | true     |             |
| password | string | true     |             |

**Response**
| field   | type    | required | description       |
| ------- | ------- | -------- | ----------------- |
| success | boolean | true     |                   |
| cause   | string  | false    | the failure cause |

**Failure causes**
| cause            | description |
| ---------------- | ----------- |
| user_not_found   |             |
| invalid_password |             |

## GET /session/current

**Response**
| field   | type    | required | description                          |
| ------- | ------- | -------- | ------------------------------------ |
| success | boolean | true     |                                      |
| cause   | string  | false    | the failure cause                    |
| session | Session | false    | the session data, if success is true |

**Failure causes**
| cause           | description                     |
| --------------- | ------------------------------- |
| expired_session | if the current expired          |
| no_session      | if no session token is provided |

## GET /session/logout
Logouts of the current session.

**Response**
| field   | type    | required | description                          |
| ------- | ------- | -------- | ------------------------------------ |
| success | boolean | true     |                                      |
| cause   | string  | false    | the failure cause                    |

**Failure causes**
| cause           | description                     |
| --------------- | ------------------------------- |
| no_session      | if no session token is provided |