const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const tasksRoutes = require('./routes/tasks');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', tasksRoutes);

app.get('/', (req, res) => res.send('Smart Task Manager API'));

module.exports = app;
