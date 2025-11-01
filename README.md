# Smart Task Manager

Professional, end-to-end task management web application.

Stack:
- Frontend: React (Create React App), Socket.IO client, Axios
- Backend: Node.js, Express, Sequelize (MySQL), JWT auth, Socket.IO server
- Database: MySQL
- Containerization: Docker + docker-compose

This repo contains:
- `backend/` — Express API with Sequelize models, auth, and Socket.IO
- `frontend/` — React SPA for login/register and task management, real-time updates
- `docker-compose.yml` — Local development setup (MySQL, backend, frontend)
- `README` with run & deployment instructions

**Notes**
- I prepared all files and validated their structure, but I could not run Docker builds or execute the project in this environment.
- Follow the instructions below on your machine (Docker installed) to build and run everything locally.

## Quick start (Docker)
1. Copy `.env.example` to `backend/.env` and edit values if needed.
2. From repository root:
```bash
docker-compose up --build
```
3. Frontend: http://localhost:3000
   Backend API: http://localhost:4000/api

See `backend/README.md` and `frontend/README.md` for more details.

