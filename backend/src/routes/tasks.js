const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const tasksController = require('../controllers/tasksController');

router.use(auth);
router.post('/', tasksController.createTask);
router.get('/', tasksController.listTasks);
router.get('/:id', tasksController.getTask);
router.put('/:id', tasksController.updateTask);
router.delete('/:id', tasksController.deleteTask);

module.exports = router;
