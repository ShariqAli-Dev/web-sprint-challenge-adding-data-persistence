const express = require('express');
const Tasks = require('./model');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const tasks = await Tasks.getAll();
    const tasksToBool = tasks.map((task) => {
      return {
        ...task,
        task_completed: Boolean(task.task_completed),
      };
    });
    res.status(200).json(tasksToBool);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    if (!req.body.project_id) {
      res.status(400).json({
        message: 'Fields are missing',
      });
    } else {
      const newTask = await Tasks.insert(req.body);
      res.status(201).json({
        ...newTask,
        task_completed: Boolean(newTask.task_completed),
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
