# Job Recruitment Platform Backend

This repository contains the backend for a Job Recruitment Platform built with Node.js, Express, and MongoDB. The platform allows employers to post job listings and manage applications, and enables job seekers to search for and apply to those jobs.

## Features

* **User Authentication:** Secure user registration and login for two distinct roles: `employer` and `job_seeker`. Authentication is handled using JSON Web Tokens (JWT).
* **Job Listings:** Employers can create, view, and manage job postings.
* **Job Search:** All users can view a list of all available jobs.
* **Application Management:** Job seekers can apply for jobs, and employers can view all applications for their job listings.
* **Role-Based Access Control:** Routes are protected to ensure that only users with the correct role can perform certain actions (e.g., only employers can post jobs).

## Technologies Used

* **Node.js:** JavaScript runtime environment.
* **Express.js:** Web application framework for Node.js.
* **MongoDB:** NoSQL database for storing user, job, and application data.
* **Mongoose:** Object Data Modeling (ODM) library for MongoDB.
* **JSON Web Tokens (JWT):** For securing API endpoints.
* **bcryptjs:** For hashing user passwords.
* **dotenv:** For managing environment variables.

---

## Setup and Installation

To get a local copy up and running, follow these simple steps.

### Prerequisites

* Node.js installed
* npm installed
* MongoDB installed and running locally

### Installation

1.  **Clone the repository**
    ```sh
    git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
    ```
2.  **Navigate to the project directory**
    ```sh
    cd job-platform-backend
    ```
3.  **Install NPM packages**
    ```sh
    npm install
    ```
4.  **Create a `.env` file** in the root of the project and add your environment variables:
    ```env
    MONGO_URI=mongodb://127.0.0.1:27017/jobplatform
    JWT_SECRET=your_super_secret_key
    ```
5.  **Start the server**
    ```sh
    node server.js
    ```
    The server will be running on `http://localhost:5000`.

---

## API Endpoints Guide

The base URL for all API endpoints is `http://localhost:5000`.

### User Authentication

#### `POST /api/users/register`

| Detail      | Value                 |
| ----------- | --------------------- |
| Description | Registers a new user. |
| Access      | Public                |

**Body:**
```json
{
    "name": "Test User",
    "email": "user@example.com",
    "password": "password123",
    "role": "job_seeker"
}
```
**Success Response:**
```json
{
    "message": "User registered successfully"
}
```

---

#### `POST /api/users/login`

| Detail      | Value                                        |
| ----------- | -------------------------------------------- |
| Description | Logs in an existing user and returns a JWT token. |
| Access      | Public                                       |

**Body:**
```json
{
    "email": "user@example.com",
    "password": "password123"
}
```
**Success Response:**
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### Job Listings

#### `POST /api/jobs`

| Detail      | Value                               |
| ----------- | ----------------------------------- |
| Description | Creates a new job listing.          |
| Access      | Private (Requires `employer` role)  |
| Headers     | `x-auth-token: <your_employer_token>` |

**Body:**
```json
{
    "title": "Software Engineer",
    "description": "Developing amazing applications.",
    "requirements": "Node.js, React",
    "location": "Remote"
}
```
**Success Response:** Returns the newly created job object.

---

#### `GET /api/jobs`

| Detail      | Value                               |
| ----------- | ----------------------------------- |
| Description | Retrieves a list of all available jobs. |
| Access      | Public                              |

**Success Response:** Returns an array of job objects.

---

### Job Applications

#### `POST /api/applications/:jobId`

| Detail      | Value                                  |
| ----------- | -------------------------------------- |
| Description | Submits an application for a specific job. |
| Access      | Private (Requires `job_seeker` role)   |
| Headers     | `x-auth-token: <your_job_seeker_token>`  |

**Success Response:**
```json
{
    "msg": "Application successful"
}
```

---

#### `GET /api/applications/:jobId`

| Detail      | Value                                          |
| ----------- | ---------------------------------------------- |
| Description | Retrieves all applications for a specific job. |
| Access      | Private (Requires `employer` role)             |
| Headers     | `x-auth-token: <your_employer_token>`          |

**Success Response:** Returns an array of application objects for the specified job.

---

## Folder Structure

```
job-platform-backend/
├── config/
│   └── db.js           # MongoDB connection configuration
├── controllers/
│   ├── applicationController.js
│   ├── jobController.js
│   └── userController.js # Logic for handling requests
├── middleware/
│   └── auth.js         # JWT authentication middleware
├── models/
│   ├── Application.js
│   ├── Job.js
│   └── User.js         # Mongoose schemas
├── routes/
│   ├── applicationRoutes.js
│   ├── jobRoutes.js
│   └── userRoutes.js   # API route definitions
├── .env                  # Environment variables
├── .gitignore            # Files to be ignored by Git
├── package.json          # Project dependencies and scripts
└── server.js             # Main server entry file
