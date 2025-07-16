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

---

## Endpoint: Get User Profile

`GET /users/profile`

### Description

Returns the authenticated user's profile information. Requires a valid JWT token in the `Authorization` header as `Bearer <token>` or in the `token` cookie.

### Authentication

This endpoint is protected. You must be logged in and provide a valid token.

### Request

No request body required. Token must be sent in the `Authorization` header or as a cookie.

### Example Request

```
GET /users/profile
Authorization: Bearer <jwt_token>
```

### Success Response (200)

```
{
  "_id": "<user_id>",
  "fullname": { "firstname": "John", "lastname": "Doe" },
  "email": "john.doe@example.com",
  "password": "<hashed_password>",
  "socketId": null,
  "__v": 0
}
```

### Unauthorized (401)

```
{
  "message": "No token provided"
}
```

or

```
{
  "message": "token is blacklisted"
}
```

or

```
{
  "message": "Unauthorized"
}
```

### Not Found (404)

```
{
  "message": "User not found"
}
```

---

## Endpoint: Logout User

`GET /users/logout`

### Description

Logs out the authenticated user by blacklisting the current JWT token and clearing the token cookie.

### Authentication

This endpoint is protected. You must be logged in and provide a valid token.

### Request

No request body required. Token must be sent in the `Authorization` header or as a cookie.

### Example Request

```
GET /users/logout
Authorization: Bearer <jwt_token>
```

### Success Response (200)

```
{
  "message": "Logged out successfully"
}
```

### Unauthorized (401)

```
{
  "message": "No token provided"
}
```

or

```
{
  "message": "token is blacklisted"
}
```

or

```
{
  "message": "Unauthorized"
}
```

---

# Captain API Documentation

## Endpoint: Register Captain

`POST /captain/register`

### Description

Registers a new captain (driver) in the system. Validates input, hashes the password, creates a captain, and returns an authentication token along with the captain data.

### Request Body

The request body must be a JSON object with the following structure:

```
{
  "fullname": {
    "firstname": "string (min 3 chars, required)",
    "lastname": "string (min 3 chars, optional)"
  },
  "email": "string (valid email, required)",
  "password": "string (min 6 chars, required)",
  "vehicle": {
    "color": "string (min 3 chars, required)",
    "plate": "string (min 3 chars, required)",
    "capacity": "number (min 1, required)",
    "vehicleType": "string (car|bike|auto, required)"
  }
}
```

### Example Request

```
POST /captain/register
Content-Type: application/json
{
  "fullname": { "firstname": "Alice", "lastname": "Smith" },
  "email": "alice.smith@example.com",
  "password": "strongPassword123",
  "vehicle": {
    "color": "Red",
    "plate": "XYZ1234",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

### Success Response (201)

```
{
  "token": "<jwt_token>",
  "captain": {
    "_id": "<captain_id>",
    "fullname": { "firstname": "Alice", "lastname": "Smith" },
    "email": "alice.smith@example.com",
    "password": "<hashed_password>",
    "socketId": null,
    "status": "inactive",
    "vehicle": {
      "color": "Red",
      "plate": "XYZ1234",
      "capacity": 4,
      "vehicleType": "car",
      "location": { "lat": null, "lng": null }
    },
    "__v": 0
  }
}
```

### Validation Error (400)

```
{
  "errors": [
    { "msg": "First name must be at least 3 characters long", "param": "fullname.firstname", "location": "body" },
    { "msg": "Color must be at least 3 characters long", "param": "vehicle.color", "location": "body" },
    ...
  ]
}
```

### Duplicate Email (400)

```
{
  "message": "Captain already exists"
}
```

---

## Notes (Captain)

- The `token` is a JWT for authenticating future requests.
- The `password` in the response is hashed.
- All required fields must be valid, or a 400 error is returned.
- Email and vehicle plate must be unique.
