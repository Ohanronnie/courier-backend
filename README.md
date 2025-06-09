
---

# Courier App Backend

## Overview

This is a backend application for a Courier platform built with [NestJS](https://nestjs.com). It provides APIs for managing users, addresses, parcels, shipments, and authentication. The app integrates with an external API for shipment management and uses PostgreSQL as the database.

---

## Table of Contents

- Features
- Technologies Used
- Setup and Installation
- Environment Variables
- Authentication
- API Endpoints
  - Auth Routes
  - User Routes
  - Address Routes
  - Parcel Routes
  - Shipment Routes
- Request and Response Samples
- Testing
- License

---

## Features

- User registration and login with JWT-based authentication.
- Address management with validation against external APIs.
- Parcel creation and management.
- Shipment creation and tracking.
- Integration with external APIs for rates, addresses, and shipments.
- Modular architecture with NestJS.

---

## Technologies Used

- **Framework**: [NestJS](https://nestjs.com)
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Authentication**: JWT
- **Validation**: `class-validator`
- **HTTP Client**: Axios
- **Testing**: Jest, Supertest

---

## Setup and Installation

### Prerequisites

- Node.js (v16+)
- PostgreSQL
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ohanronnie/courier-backend.git
   cd logistics-app-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a .env file in the root directory and add the following variables:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=logistics_db
   JWT_SECRET=your_jwt_secret
   TERMINAL_API_URL=https://api.example.com
   TERMINAL_API_KEY=your_api_key
   ```

4. Run the application:
   ```bash
   npm run start:dev
   ```

5. Access the API at `http://localhost:3000`.

---

## Environment Variables

| Variable           | Description                          | Example Value          |
|--------------------|--------------------------------------|------------------------|
| `DB_HOST`          | Database host                       | `localhost`            |
| `DB_PORT`          | Database port                       | `5432`                 |
| `DB_USER`          | Database username                   | `postgres`             |
| `DB_PASSWORD`      | Database password                   | `password`             |
| `DB_NAME`          | Database name                       | `logistics_db`         |
| `JWT_SECRET`       | Secret key for JWT                  | `your_jwt_secret`      |
| `TERMINAL_API_URL` | Base URL for Terminal africa API        | `https://api.example.com` |
| `TERMINAL_API_KEY` | API key for the external API         | `your_api_key`         |

---

## Authentication

This app uses **JWT (JSON Web Token)** for authentication. To access protected routes, include the token in the `Authorization` header as follows:

```http
Authorization: Bearer <your_token>
```

---

## API Endpoints

### Auth Routes

| Method | Endpoint       | Description              | Protected |
|--------|----------------|--------------------------|-----------|
| POST   | `/auth/register` | Register a new user      | No        |
| POST   | `/auth/login`    | Login and get a token    | No        |

### User Routes

| Method | Endpoint       | Description              | Protected |
|--------|----------------|--------------------------|-----------|
| GET    | users       | Get all users            | Yes       |
| GET    | `/users/:id`   | Get a user by ID         | Yes       |
| PATCH  | `/users/:id`   | Update a user            | Yes       |
| DELETE | `/users/:id`   | Delete a user            | Yes       |

### Address Routes

| Method | Endpoint         | Description                  | Protected |
|--------|------------------|------------------------------|-----------|
| POST   | `/address/create` | Create a new address         | Yes       |

### Parcel Routes

| Method | Endpoint               | Description                  | Protected |
|--------|------------------------|------------------------------|-----------|
| POST   | `/parcel/package/create` | Create a new packaging       | Yes       |
| POST   | `/parcel/create`         | Create a new parcel          | Yes       |

### Shipment Routes

| Method | Endpoint         | Description                  | Protected |
|--------|------------------|------------------------------|-----------|
| POST   | `/shipments/rates` | Get shipment rates           | Yes       |
| POST   | `/shipments/create` | Create a new shipment        | Yes       |

---

## Request and Response Samples

### 1. **Register a User**

**Endpoint**: `POST /auth/register`

**Request Body**:
```json
{
  "email": "john.doe@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890"
}
```

**Response**:
```json
{
  "statusCode": 201,
  "message": "User created successfully",
  "data": null
}
```

---

### 2. **Login a User**

**Endpoint**: `POST /auth/login`

**Request Body**:
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Response**:
```json
{
  "statusCode": 200,
  "message": "Login successful",
  "data": {
    "token": "your_jwt_token"
  }
}
```

---

### 3. **Create an Address**

**Endpoint**: `POST /address/create`

**Request Body**:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "addressLine1": "123 Main St",
  "city": "New York",
  "state": "NY",
  "country": "US",
  "postalCode": "10001",
  "phone": "+1234567890",
  "type": "sender"
}
```

**Response**:
```json
{
  "statusCode": 201,
  "message": "Address created successfully",
  "data": {
    "addressId": "addr_123"
  }
}
```

---

### 4. **Create a Parcel**

**Endpoint**: `POST /parcel/create`

**Request Body**:
```json
{
  "description": "Electronics",
  "packagingId": "pkg_123",
  "items": [
    {
      "description": "Laptop",
      "name": "MacBook Pro",
      "type": "parcel",
      "currency": "USD",
      "quantity": 1,
      "weight": 2.5,
      "value": 2000
    }
  ]
}
```

**Response**:
```json
{
  "statusCode": 201,
  "message": "Parcel created successfully",
  "data": "parcel_123"
}
```

---

### 5. **Create a Shipment**

**Endpoint**: `POST /shipments/create`

**Request Body**:
```json
{
  "pickupAddress": "addr_123",
  "deliveryAddress": "addr_456",
  "parcelId": "parcel_123",
  "shipmentPurpose": "commercial",
  "shipmentType": "express"
}
```

**Response**:
```json
{
  "statusCode": 201,
  "message": "Shipment created successfully",
  "data": {
    "shipmentId": "ship_123"
  }
}
```

---

## Testing

Run unit and e2e tests using Jest:

```bash
# Unit tests
npm run test

# End-to-end tests
npm run test:e2e

# Test coverage
npm run test:cov
```

---

## License