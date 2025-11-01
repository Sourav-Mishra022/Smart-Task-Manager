const http = require('http');
const app = require('./app');
const server = http.createServer(app);
const { Server } = require('socket.io');
const sequelize = require('./config/db');

const io = new Server(server, {
  cors: { origin: '*' }
});

io.on('connection', (socket) => {
  // client should emit 'join' with their userId after login
  socket.on('join', (userId) => {
    socket.join(`user_${userId}`);
  });
  socket.on('leave', (userId) => {
    socket.leave(`user_${userId}`);
  });
});

app.set('io', io);

const PORT = process.env.PORT || 4000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log('DB connected');
    server.listen(PORT, () => console.log(`Server listening ${PORT}`));
  } catch (err) {
    console.error('Unable to connect to DB:', err);
  }
})();
