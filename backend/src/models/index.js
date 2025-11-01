const sequelize = require('../config/db');
const User = require('./user');
const Task = require('./task');

async function sync() {
  try {
    await sequelize.authenticate();
    console.log('DB Connected');
    await sequelize.sync({ alter: true });
    console.log('Models synced');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

if (require.main === module) sync();

module.exports = { sequelize, User, Task };
