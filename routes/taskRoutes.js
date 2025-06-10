const express = require('express');
const Task = require('../models/Task');
const auth = require('../middleware/authMiddleware');
const { autoScheduleTasks } = require('../utils/scheduler');
const router = express.Router();

// Create Task
router.post('/', auth, async (req, res) => {
  try {
    const task = await Task.create({ ...req.body, user: req.user.id });
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get Tasks
router.get('/', auth, async (req, res) => {
  const tasks = await Task.find({ user: req.user.id });
  res.json(tasks);
});

// Auto Schedule Tasks
router.post('/auto-schedule', auth, async (req, res) => {
  const result = await autoScheduleTasks(req.user.id);
  res.json(result);
});

module.exports = router;
