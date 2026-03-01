# QuickHire Backend

## Admin Credentials

This frontend expects JWT-based authentication from the backend.

Admin login:

```json
{
  "email": "shahinkhan5979@gmail.com",
  "password": "qwerty"
}
```

Protected admin actions:

- Create a job
- Delete a job

These routes require:

`Authorization: Bearer <token>`

Backend API for the QuickHire job portal. This service provides:

- user registration and login
- job listing and job details
- admin-only job creation and deletion
- job application submission

## Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB with Mongoose
- JWT authentication

## Requirements

- Node.js 18+ recommended
- npm
- MongoDB database

## Installation

1. Clone the repository.
2. Move into the project directory.
3. Install dependencies:

```bash
npm install
```

4. Create a `.env` file in the project root.

Example:

```env
PORT=5000
NODE_ENV=development
DB_URI=mongodb+srv://<username>:<password>@<cluster>/<database>?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret
```

You can also use these MongoDB variables instead of `DB_URI`:

```env
DB_USER=your_mongodb_username
DB_PASS=your_mongodb_password
DB_NAME=your_database_name
```

## Run the Project

Development mode:

```bash
npm run dev
```

Build:

```bash
npm run build
```

Production mode:

```bash
npm start
```

The API runs by default at:

```text
http://localhost:5000
```

## Admin Credential

This project does not include a built-in seeded admin user.

Admin access is granted automatically when a user registers with this email:

```text
admin@quickhire.com
```

Use any password you want during registration. For local testing, you can use:

```text
Email: admin@quickhire.com
Password: Admin@12345
```

Important: this credential works only after you register that user first with `POST /api/auth/register`.

## API Endpoints

### Health Check

```http
GET /
```

### Auth

Register user:

```http
POST /api/auth/register
```

Example body:

```json
{
  "name": "Admin User",
  "email": "admin@quickhire.com",
  "password": "Admin@12345"
}
```

Login:

```http
POST /api/auth/login
```

Example body:

```json
{
  "email": "admin@quickhire.com",
  "password": "Admin@12345"
}
```

### Jobs

Get all jobs:

```http
GET /api/jobs
```

Optional query params:

- `title`
- `location`
- `category`

Get single job:

```http
GET /api/jobs/:id
```

Create job (admin only):

```http
POST /api/jobs
Authorization: Bearer <token>
```

Example body:

```json
{
  "title": "Frontend Developer",
  "companyName": "QuickHire",
  "location": "Dhaka",
  "jobType": "Full-time",
  "salary": "60000 BDT",
  "category": "Development",
  "logo": "https://example.com/logo.png",
  "logoColor": "#0f172a",
  "tag2": "Remote",
  "description": "Build and maintain frontend features."
}
```

Delete job (admin only):

```http
DELETE /api/jobs/:id
Authorization: Bearer <token>
```

### Applications

Submit application:

```http
POST /api/applications
```

Example body:

```json
{
  "job": "JOB_ID_HERE",
  "name": "John Doe",
  "email": "john@example.com",
  "resumeLink": "https://example.com/resume.pdf",
  "coverLetter": "I am interested in this role."
}
```

## Suggested Local Flow

1. Start the server with `npm run dev`.
2. Register the admin user with `admin@quickhire.com`.
3. Login with that admin account to get a JWT token.
4. Use the token to create jobs.
5. Use public endpoints to fetch jobs and submit applications.

## Notes

- If `JWT_SECRET` is not set, the app falls back to a default secret. Setting your own secret is strongly recommended.
- The backend source now lives in `src/**/*.ts` and compiles to `dist/` with `npm run build`.
