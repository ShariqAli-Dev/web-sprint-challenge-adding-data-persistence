const express = require('express');
const Projects = require('./model');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const projects = await Projects.getAll();
    const projectsToBool = projects.map((project) => {
      return {
        ...project,
        project_completed: Boolean(project.project_completed),
      };
    });
    res.status(200).json(projectsToBool);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    if (req.body.project_name) {
      res.status(400).json({ message: 'A field is missing' });
    } else {
      const project = await Projects.insert(req.body);
      res.status(201).json({
        ...project,
        project_completed: Boolean(project.project_completed),
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
