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
    res.status.json(projectsToBool);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
