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

`POST /captains/register`

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
POST /captains/register
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

---

## Endpoint: Login Captain

`POST /captains/login`

### Description

Authenticates a captain with email and password. Returns a JWT token and captain data on success.

### Request Body

```
{
  "email": "string (valid email, required)",
  "password": "string (min 6 chars, required)"
}
```

### Example Request

```
POST /captains/login
Content-Type: application/json
{
  "email": "alice.smith@example.com",
  "password": "strongPassword123"
}
```

### Success Response (200)

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

## Endpoint: Get Captain Profile

`GET /captains/profile`

### Description

Returns the authenticated captain's profile information. Requires a valid JWT token in the `Authorization` header as `Bearer <token>` or in the `token` cookie.

### Authentication

This endpoint is protected. You must be logged in and provide a valid token.

### Request

No request body required. Token must be sent in the `Authorization` header or as a cookie.

### Example Request

```
GET /captains/profile
Authorization: Bearer <jwt_token>
```

### Success Response (200)

```
{
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
  "message": "Captain not found"
}
```

---

## Endpoint: Logout Captain

`GET /captains/logout`

### Description

Logs out the authenticated captain by blacklisting the current JWT token and clearing the token cookie.

### Authentication

This endpoint is protected. You must be logged in and provide a valid token.

### Request

No request body required. Token must be sent in the `Authorization` header or as a cookie.

### Example Request

```
GET /captains/logout
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

# Maps API Documentation

## Endpoint: Get Coordinates

`GET /maps/get-coordinates`

### Description

Retrieves latitude and longitude coordinates for a given address using Google Maps Geocoding API.

### Authentication

This endpoint is protected. You must be logged in and provide a valid token.

### Query Parameters

```
address: string (min 3 chars, required) - The address to get coordinates for
```

### Example Request

```
GET /maps/get-coordinates?address=1600 Amphitheatre Parkway, Mountain View, CA
Authorization: Bearer <jwt_token>
```

### Success Response (200)

```
{
  "ltd": 37.4224764,
  "long": -122.0842499
}
```

### Validation Error (400)

```
{
  "errors": [
    {
      "msg": "Invalid value",
      "param": "address",
      "location": "query"
    }
  ]
}
```

### Not Found (404)

```
{
  "message": "Coordinates not found"
}
```

---

## Endpoint: Get Distance and Time

`GET /maps/get-distance-time`

### Description

Calculates distance and travel time between two locations using Google Maps Distance Matrix API.

### Authentication

This endpoint is protected. You must be logged in and provide a valid token.

### Query Parameters

```
origin: string (min 3 chars, required) - Starting location
destination: string (min 3 chars, required) - Destination location
```

### Example Request

```
GET /maps/get-distance-time?origin=New York, NY&destination=Boston, MA
Authorization: Bearer <jwt_token>
```

### Success Response (200)

```
{
  "distance": {
    "text": "215 mi",
    "value": 346030
  },
  "duration": {
    "text": "3 hours 45 mins",
    "value": 13500
  }
}
```

### Validation Error (400)

```
{
  "errors": [
    {
      "msg": "Invalid value",
      "param": "origin",
      "location": "query"
    },
    {
      "msg": "Invalid value",
      "param": "destination",
      "location": "query"
    }
  ]
}
```

### Not Found (404)

```
{
  "message": "Distance and time not found"
}
```

---

## Endpoint: Get Auto-Complete Suggestions

`GET /maps/get-suggestions`

### Description

Provides place autocomplete suggestions based on user input using Google Maps Places API.

### Authentication

This endpoint is protected. You must be logged in and provide a valid token.

### Query Parameters

```
input: string (min 3 chars, required) - The input text to get suggestions for
```

### Example Request

```
GET /maps/get-suggestions?input=Times Square
Authorization: Bearer <jwt_token>
```

### Success Response (200)

```
[
  {
    "description": "Times Square, New York, NY, USA",
    "matched_substrings": [
      {
        "length": 12,
        "offset": 0
      }
    ],
    "place_id": "ChIJmQJIxlVYwokRLgeuocVOGVU",
    "reference": "ChIJmQJIxlVYwokRLgeuocVOGVU",
    "structured_formatting": {
      "main_text": "Times Square",
      "main_text_matched_substrings": [
        {
          "length": 12,
          "offset": 0
        }
      ],
      "secondary_text": "New York, NY, USA"
    },
    "terms": [
      {
        "offset": 0,
        "value": "Times Square"
      },
      {
        "offset": 14,
        "value": "New York"
      },
      {
        "offset": 24,
        "value": "NY"
      },
      {
        "offset": 28,
        "value": "USA"
      }
    ],
    "types": [
      "tourist_attraction",
      "establishment",
      "point_of_interest"
    ]
  }
]
```

### Validation Error (400)

```
{
  "errors": [
    {
      "msg": "Invalid value",
      "param": "input",
      "location": "query"
    }
  ]
}
```

### Not Found (404)

```
{
  "message": "Suggestions not found"
}
```

---

# Rides API Documentation

## Endpoint: Create Ride

`POST /rides/create`

### Description

Creates a new ride request. Calculates fare based on pickup and destination locations, and generates an OTP for the ride.

### Authentication

This endpoint is protected. You must be logged in and provide a valid token.

### Request Body

```
{
  "pickup": "string (min 3 chars, required) - Pickup location",
  "destination": "string (min 3 chars, required) - Destination location",
  "vehicleType": "string (car|bike|auto, required) - Type of vehicle requested"
}
```

### Example Request

```
POST /rides/create
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "pickup": "Times Square, New York, NY",
  "destination": "Central Park, New York, NY",
  "vehicleType": "car"
}
```

### Success Response (201)

```
{
  "ride": {
    "_id": "<ride_id>",
    "user": "<user_id>",
    "pickup": "Times Square, New York, NY",
    "destination": "Central Park, New York, NY",
    "fare": 75.5,
    "status": "pending",
    "otp": "1234",
    "__v": 0
  }
}
```

### Validation Error (400)

```
{
  "errors": [
    {
      "msg": "invalid pickup location",
      "param": "pickup",
      "location": "body"
    },
    {
      "msg": "Invalid destination location",
      "param": "destination",
      "location": "body"
    },
    {
      "msg": "Invalid vehicle type",
      "param": "vehicleType",
      "location": "body"
    }
  ]
}
```

### Server Error (500)

```
{
  "error": "Error message describing what went wrong"
}
```

---

## Notes (Maps & Rides)

- All Maps endpoints require Google Maps API key to be configured in environment variables
- Distance is returned in meters, duration in seconds
- Fare calculation is based on base fare + distance rate + time rate for each vehicle type
- OTP is automatically generated for each ride (4 digits)
- Ride status defaults to "pending" when created
- All endpoints require authentication via JWT token
