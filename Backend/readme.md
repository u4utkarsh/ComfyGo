# User API Documentation

## Endpoint: Register User

`POST /users/register`

## Description

Registers a new user in the system. This endpoint validates the input, hashes the password, creates a user, and returns an authentication token along with the user data.

## Request Body

The request body must be a JSON object with the following structure:

```
{
  "fullname": {
    "firstname": "string (min 3 chars, required)",
    "lastname": "string (min 3 chars, optional)"
  },
  "email": "string (valid email, required)",
  "password": "string (min 6 chars, required)"
}
```

### Example Request

```
POST /users/register
Content-Type: application/json

{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

## Responses

### Success (201 Created)

```
Status: 201 Created
{
  "token": "<jwt_token>",
  "user": {
    "_id": "<user_id>",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "<hashed_password>",
    "socketId": null,
    "__v": 0
  }
}
```

### Validation Error (400 Bad Request)

```
Status: 400 Bad Request
{
  "errors": [
    {
      "msg": "First name must be atleast 3 characters long",
      "param": "fullname.firstname",
      "location": "body"
    },
    ...
  ]
}
``` 

## Endpoint: Login User

`POST /users/login`

### Description

Authenticates a user with email and password. Returns a JWT token and user data on success.

### Request Body

```
{
  "email": "string (valid email, required)",
  "password": "string (min 6 chars, required)"
}
```

### Example Request

```
POST /users/login
Content-Type: application/json
{
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

### Success Response (200)

```
{
  "token": "<jwt_token>",
  "user": {
    "_id": "<user_id>",
    "fullname": { "firstname": "John", "lastname": "Doe" },
    "email": "john.doe@example.com",
    "password": "<hashed_password>",
    "socketId": null,
    "__v": 0
  }
}
```

### Validation Error (400)

```
{
  "errors": [
    { "msg": "Please enter a valid email address", "param": "email", "location": "body" },
    ...
  ]
}
```

### Authentication Error (401)

```
{
  "message": "Invalid email or password"
}
```

---

## Notes

- The `token` is a JWT for authenticating future requests.
- The `password` in the response is hashed.
- All required fields must be valid, or a 400 error is returned.
- On invalid credentials, a 401 error is returned.
