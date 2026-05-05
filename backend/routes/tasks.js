const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const auth = require('../middleware/auth').auth;

// Create task
router.post('/', auth, async (req, res) => {
  try {
    const task = new Task({
      ...req.body,
      // Only project admin or members can create tasks
    });
    await task.save();
    await task.populate('assignedTo project', 'name email title');
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get tasks for project/user
router.get('/', auth, async (req, res) => {
  try {
    const { projectId } = req.query;
    const match = { assignedTo: req.user._id };
    if (projectId) match.project = projectId;
    
    const tasks = await Task.find(match)
      .populate('assignedTo project', 'name title')
      .sort({ dueDate: 1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update task status
router.put('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, assignedTo: req.user._id },
      req.body,
      { new: true, runValidators: true }
    ).populate('assignedTo project', 'name title');
    if (!task) return res.status(404).json({ error: 'Task not found or not authorized' });
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

