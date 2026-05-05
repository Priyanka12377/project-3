const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const auth = require('../middleware/auth').auth;
const adminAuth = require('../middleware/auth').adminAuth;

// Create project (admin only)
router.post('/', auth, adminAuth, async (req, res) => {
  try {
    const project = new Project({
      ...req.body,
      admin: req.user._id
    });
    await project.save();
    await project.populate('admin team', 'name email');
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all projects for user
router.get('/', auth, async (req, res) => {
  try {
    const projects = await Project.find({ 
      $or: [{ admin: req.user._id }, { team: req.user._id }] 
    }).populate('admin team', 'name email');
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update project
router.put('/:id', auth, adminAuth, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('admin team', 'name email');
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

