📅 Google Calendar Scheduler

A full-stack meeting scheduling application that allows users to book meetings based on admin availability, automatically generates Google Meet links, and provides admin-level reporting with CSV/Excel exports.
Built with FastAPI + React, secured using JWT authentication, and designed for real-world scheduling workflows.

🚀 Features
🔐 Authentication & Roles

JWT-based authentication

Role-based access control

Two roles:

ADMIN – manages availability & reports
USER – books and manages meetings

🧑‍💼 Admin Capabilities

Create availability using start time & end time
Automatic 30-minute slot generation
Prevent double bookings
Download booking reports:

📄 CSV
📊 Excel

Google Meet link auto-generation

👤 User Capabilities

View available slots by date
Book meetings without knowing admin IDs
Add meeting purpose
Receive Google Meet link
View My Bookings
Cancel bookings anytime

🧱 Tech Stack

Backend:

FastAPI
SQLAlchemy
SQLite
JWT (HTTP Bearer Auth)
Google Calendar API
CORS enabled

Frontend:

React (Vite)
Axios
React Router
JWT Decode
React Hot Toast

Modular role-based dashboards

📂 Project Structure
google-calendar-scheduler/
│
├── backend/
│   ├── app/
│   │   ├── auth/
│   │   ├── availability/
│   │   ├── bookings/
│   │   ├── reports/
│   │   ├── google/
│   │   ├── database.py
│   │   └── main.py
│   ├── credentials/        # (gitignored)
│   ├── scheduler.db
│   └── requirements.txt
│
├── frontend/
│   └── frontend/
│       ├── src/
│       │   ├── pages/
│       │   ├── components/
│       │   ├── routes/
│       │   ├── api/
│       │   └── utils/
│       └── vite.config.js
│
├── README.md
└── backend-structure.png

🔑 Environment Variables

Create a .env file inside backend/:

JWT_SECRET=your_secret_key
GOOGLE_APPLICATION_CREDENTIALS=credentials/service_account.json


⚠️ Never commit .env or credentials
They are excluded using .gitignore.

▶️ Running the Project
Backend
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload


Runs on:
👉 http://localhost:8000

Swagger UI:
👉 http://localhost:8000/docs

Frontend
cd frontend/frontend
npm install
npm run dev


Runs on:
👉 http://localhost:5173

🔁 Application Flow

User/Admin registers

Login → JWT stored securely

Redirect to /me

Role-based dashboard:

/dashboard/admin

/dashboard/user

Admin sets availability

User books meeting

Google Meet link generated

Admin exports reports

🔒 Security

Passwords hashed using bcrypt

JWT validated on every protected route

Role-based route protection

CORS enabled for frontend access

📊 Reports

Admins can export booking data as:

CSV

Excel

Includes:

User email

Date & time

Purpose

Google Meet link

🌐 Google Meet Integration

Uses Google Calendar API

Meetings created automatically

Secure Meet links generated per booking

📌 Notes

Backend and frontend are fully decoupled

API follows REST conventions

Easily extendable to:

Email notifications

Multi-admin support

Deployment (Vercel + Render)

🧑‍💻 Author
Sai Hrithesh
