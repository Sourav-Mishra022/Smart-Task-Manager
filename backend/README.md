# Backend - Smart Task Manager

## Setup (local, without Docker)
1. Install Node.js (v18+ recommended)
2. Create `.env` from `.env.example` and set values
3. Install dependencies:
   ```bash
   cd backend
   npm install
   ```
4. Ensure MySQL is running and accessible. Create database or use the one in `.env`.
5. Sync models (creates tables):
   ```bash
   npm run migrate
   ```
6. Start server:
   ```bash
   npm run dev
   # or
   npm start
   ```

## API
- `POST /api/auth/register` — register
- `POST /api/auth/login` — login
- `GET /api/tasks` — list (authenticated)
- `POST /api/tasks` — create (authenticated)
- `PUT /api/tasks/:id` — update (authenticated)
- `DELETE /api/tasks/:id` — delete (authenticated)

Real-time events: `task_created`, `task_updated`, `task_deleted` via Socket.IO.
