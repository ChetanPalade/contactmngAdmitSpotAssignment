This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).
# Contact Management System API

## Overview
>> This is a comprehensive RESTful API built using Next.js for managing contacts. The API includes features such as user authentication (JWT-based), contact management (CRUD operations), file handling for CSV/Excel bulk upload, and timezone-aware date-time management. The API is designed with PostgreSQL as the database and includes robust validation, error handling, and security mechanisms (rate limiting, password hashing).

## Features

>> User registration, login, and email verification using JWT.
>> Contact creation, retrieval, update, and deletion with soft delete functionality.
>> Batch processing and bulk contact upload via CSV or Excel files.
>> Date-time management with support for timezones.
>> Input validation using Joi.
>> Security measures including rate limiting and password hashing.
>> Database interaction using PostgreSQL.

# Technologies Used
>> Backend Framework: Next.js (API Routes)
>> Database: PostgreSQL
>> Authentication: JWT (JSON Web Token)
>> Validation: Joi
>> File Parsing: CSV/Excel handling with csv-parser and xlsx
>> Security: bcryptjs, rate-limiter-flexible
>> Date-Time Management: moment-timezone

# Project Setup
>> Prerequisites
Node.js (>= 16.x)
PostgreSQL database

npm or yarn
Environment Variables

>> Create a .env.local file in the root directory and add the following environment variables:

DATABASE_URL=postgres://user:password@localhost:5432/contact_management
JWT_SECRET=your_secret_key

# SCREENSHOTS
![Screenshot 2024-10-22 200640](https://github.com/user-attachments/assets/71741741-c40b-4521-abd3-9565bf50d9a3)
![Screenshot 2024-10-22 200742](https://github.com/user-attachments/assets/748925ce-a07d-4085-ada1-18dc89bea5d7)


# Install Dependencies
Run the following command to install all dependencies:

npm install
Database Setup
>> Create a PostgreSQL Database:

CREATE DATABASE contact_management;
Create the necessary tables:

-- Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contacts Table
CREATE TABLE contacts (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    name VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(15),
    address TEXT,
    timezone VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP
);

Database Configuration: The app uses PostgreSQL via pg and pg-promise for database interactions. Ensure that the DATABASE_URL in your .env.local is configured correctly.

>> Running the Server
-- Start the Next.js server:

-- npm run dev
The API will be available at http://localhost:3000/api.

Testing the API
You can use Postman or cURL to test the following endpoints.

# API Endpoints
1. User Authentication
Register User
POST /api/auth/register

# json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
Login User
POST /api/auth/login

json
Copy code
{
  "email": "john@example.com",
  "password": "password123"
}
2. Contact Management
Create a Contact
POST /api/contacts

Headers:

Authorization: Bearer <JWT-Token>
Body:

{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "123456789",
  "address": "123 Main St",
  "timezone": "America/New_York"
}
Retrieve Contacts (with Filtering and Sorting)
GET /api/contacts?filterBy=name&sortBy=created_at

Headers:

Authorization: Bearer <JWT-Token>
Update Contact
PUT /api/contacts/:id

Headers:

Authorization: Bearer <JWT-Token>
Body:

json
Copy code
{
  "name": "Chetan P Updated",
  "email": "chetan.updated@example.com",
  "phone": "987654321",
  "address": "456 Secondary St",
  "timezone": "India/Mumbai"
}

Delete Contact (Soft Delete)
DELETE /api/contacts/:id

Headers:

Authorization: Bearer <JWT-Token>
Batch Processing (CSV/Excel Upload)
POST /api/contacts/upload

Headers:

Authorization: Bearer <JWT-Token>
Upload a CSV or Excel file containing the contact data.

Download Contacts as CSV/Excel
GET /api/contacts/download

Headers:

Authorization: Bearer <JWT-Token>
Validation
Validation is implemented using Joi for both user registration/login and contact creation. For example, the contact creation schema validates that the name, email, phone, and address are in the correct format and required fields are not empty.

# Security
-> JWT Authentication: Ensures that only authorized users can access contact data.
-> Password Hashing: User passwords are hashed using bcryptjs before being stored in the database.
-> Rate Limiting: Sensitive endpoints like login and registration are rate-limited using rate-limiter-flexible to prevent brute-force attacks.

# File Handling
-> CSV/Excel Parsing: The API allows bulk contact upload via CSV or Excel files. It parses the file content and validates each contact before saving them to the database.
-> File Download: Users can download their contacts as a CSV or Excel file.

# Date-Time Handling
-> Timestamps: Contact creation and update timestamps are stored in UTC.
-> Timezone Conversion: When retrieving contacts, the timestamps are converted to the user’s specified timezone using moment-timezone.

# Deployment
The application can be deployed on render.


ER Diagram
The following is the database schema design:


Users
------------------------
id | name | email | password | is_verified | created_at

Contacts
-----------------------------------------------
id | user_id | name | email | phone | address | timezone | created_at | updated_at | deleted_at
Running Tests
You can run tests for each API endpoint using Postman by importing the provided collection and running it against the local or deployed server.



## Getting Started


You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!


Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
