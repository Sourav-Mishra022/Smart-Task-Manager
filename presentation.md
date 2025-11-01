# Smart Task Manager - Project Overview (for interviews)

**One-liner:** A professional full-stack task manager built with React, Node/Express, MySQL, Docker, and real-time updates using Socket.IO.

**Tech highlights**
- JWT-based authentication and secure password hashing (bcrypt).
- RESTful CRUD APIs for tasks with user-scoped access control.
- Real-time updates so multiple client sessions receive live changes.
- Containerized with Docker and orchestrated locally with docker-compose.
- Production-ready notes: use RDS for MySQL, ALB/Nginx, TLS, and secrets manager.

**Architecture**
- React SPA served by Nginx (production) or CRA dev server (development).
- Express API handles authentication, business logic, and Socket.IO messaging.
- MySQL stores normalized Users and Tasks (one-to-many).
- Socket rooms per user (room name `user_{id}`) for targeted events.

**What to say in interviews**
- Explain how JWT keeps the backend stateless and how to migrate to refresh tokens for long sessions.
- Describe scaling Socket.IO with Redis adapter for multiple backend instances.
- Mention the decision to use Sequelize for faster development and the tradeoffs vs raw queries.

