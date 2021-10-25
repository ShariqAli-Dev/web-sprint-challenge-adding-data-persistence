const db = require('./../../data/dbConfig');

const getAll = () => {
  return db('projects');
};

const insert = (project) => {
  return db('projects')
    .insert(project)
    .then((project_id) => {
      return db('projects').where('project_id', project_id).first();
    });
};

module.exports = {
  insert,
  getAll,
};
