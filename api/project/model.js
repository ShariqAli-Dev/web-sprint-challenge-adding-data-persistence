// build your `Project` model here
const db = require('./../../data/dbConfig');

const getAll = () => {
  return db('projects');
};

module.exports = {
  getAll,
};
