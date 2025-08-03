# Job Recruitment Platform Backend 🚀

Hey! So, this is the backend for a Job Recruitment Platform I built. It's all done with Node.js, Express, and MongoDB. Basically, it's the server-side stuff that lets employers post jobs and job seekers apply for them.

## What it Can Do (Features)

* **User Stuff:** People can sign up and log in as either an `employer` or a `job_seeker`. It uses JWTs to keep things secure.
* **Job Postings:** Employers can post new jobs, see their listings, etc.
* **Job Searching:** Anyone can see a list of all the jobs available.
* **Applying to Jobs:** Job seekers can apply for jobs, and employers can see who applied to their postings.
* **Permissions:** It's set up so only employers can do employer things, you know?

## The Tech Stack 💻

* **Node.js:** For running the JavaScript on the server.
* **Express.js:** A framework that makes building the server and API routes way easier.
* **MongoDB:** The database. It's NoSQL, so it's pretty flexible for storing our data (users, jobs, applications).
* **Mongoose:** Helps us talk to MongoDB from our code without writing a ton of messy database queries.
* **JSON Web Tokens (JWT):** For handling the login tokens.
* **bcryptjs:** To hash passwords before saving them. Never store plain text passwords!
* **dotenv:** To manage secret stuff like database connection strings.

---

## How to Get it Running 🛠️

Alright, so you wanna run this on your own machine? Here’s how to do it, step-by-step.

### Stuff You Need First

* Make sure you have **Node.js** and **npm** installed.
* You'll also need **MongoDB** installed and running on your computer.

### Installation Steps

1.  **Clone the Repo**
    First thing, you need to download the code from GitHub. Open your terminal and run this:
    ```sh
    git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
    ```

2.  **Go into the Project Folder**
    ```sh
    cd job-platform-backend
    ```

3.  **Install All the Dependencies**
    This project uses a bunch of external libraries (like Express, Mongoose, etc.). The `package.json` file has a list of everything we need. This command will download and install all of them into a `node_modules` folder for you.
    ```sh
    npm install
    ```

4.  **Create Your Environment File**
    This is a super important step. Create a file named `.env` right in the main `job-platform-backend` folder. This file is for your secrets, so they don't get pushed to GitHub.
    Inside that `.env` file, paste this and add your own secret key:
    ```env
    MONGO_URI=mongodb://127.0.0.1:27017/jobplatform
    JWT_SECRET=put_a_long_random_secret_string_here
    ```
    * The `MONGO_URI` should be correct if you're running MongoDB locally.
    * For `JWT_SECRET`, just make up a long, random string. It's used to sign the login tokens.

5.  **Start the Server!**
    You're all set! Just run this command in your terminal:
    ```sh
    node server.js
    ```
    If everything worked, you should see a message saying `Server running on port 5000`.

---

## Guide to the API Endpoints

Okay, so the server is running. Now what? You can use a tool like **Postman** to test the API endpoints. The base URL for everything is `http://localhost:5000`.

### User Authentication

#### `POST /api/users/register`
Use this to create a new user. Just send a POST request with the user's info in the body.

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
Use this to log in. If your email and password are correct, it'll give you back a token. You'll need this token for pretty much everything else.

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
To post a new job, you have to be logged in as an `employer`. Make sure you include your token in the request headers.

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
Anyone can see the list of jobs. You don't need to be logged in for this one.

| Detail      | Value                               |
| ----------- | ----------------------------------- |
| Description | Retrieves a list of all available jobs. |
| Access      | Public                              |

**Success Response:** Returns an array of job objects.

---

### Job Applications

#### `POST /api/applications/:jobId`
To apply for a job, you need to be a `job_seeker`. Put the job's ID in the URL and your token in the headers.

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
An `employer` can see all the applications for one of their jobs. Again, put the job ID in the URL and the employer's token in the headers.

| Detail      | Value                                          |
| ----------- | ---------------------------------------------- |
| Description | Retrieves all applications for a specific job. |
| Access      | Private (Requires `employer` role)             |
| Headers     | `x-auth-token: <your_employer_token>`          |

**Success Response:** Returns an array of application objects for the specified job.

---

## Folder Structure

Here's how the project is organized:

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
