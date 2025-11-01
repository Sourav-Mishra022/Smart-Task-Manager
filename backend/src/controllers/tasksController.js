const { Task } = require('../models');

const createTask = async (req, res) => {
  try {
    const data = { ...req.body, user_id: req.user.id };
    const task = await Task.create(data);
    req.app.get('io')?.to(`user_${req.user.id}`).emit('task_created', task);
    res.status(201).json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const listTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({ where: { user_id: req.user.id }, order: [['created_at','DESC']] });
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const getTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findOne({ where: { id, user_id: req.user.id }});
    if (!task) return res.status(404).json({ message: 'Not found' });
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findOne({ where: { id, user_id: req.user.id }});
    if (!task) return res.status(404).json({ message: 'Not found' });
    await task.update(req.body);
    req.app.get('io')?.to(`user_${req.user.id}`).emit('task_updated', task);
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findOne({ where: { id, user_id: req.user.id }});
    if (!task) return res.status(404).json({ message: 'Not found' });
    await task.destroy();
    req.app.get('io')?.to(`user_${req.user.id}`).emit('task_deleted', { id });
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createTask, listTasks, getTask, updateTask, deleteTask };
