const db = require('./../../data/dbConfig');

const getAll = () => {
  return db('resources');
};

const insert = (resource) => {
  return db('resources')
    .insert(resource)
    .then((resource_id) => {
      return db('resources').where({ resource_id });
    });
};

module.exports = {
  insert,
  getAll,
};
