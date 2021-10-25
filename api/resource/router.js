const express = require('express');
const Resources = require('./model');
const db = require('./../../data/dbConfig');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const resources = await Resources.getAll();
    res.status(200).json(resources);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const nameMaybe = await db('resources')
      .where('resource_name', req.body.resource_name)
      .first();
    if (!nameMaybe) {
      const newName = await Resources.insert(req.body);
      res.status(201).json(newName);
    } else {
      res.status(400).json({
        message: 'Name is already in use',
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
