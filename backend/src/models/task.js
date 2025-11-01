const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');

const Task = sequelize.define('Task', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  status: { type: DataTypes.ENUM('todo','in_progress','done'), defaultValue: 'todo' },
  priority: { type: DataTypes.ENUM('low','medium','high'), defaultValue: 'medium' },
  due_date: { type: DataTypes.DATE, allowNull: true }
}, {
  tableName: 'tasks',
  underscored: true,
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

Task.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Task, { foreignKey: 'user_id' });

module.exports = Task;
