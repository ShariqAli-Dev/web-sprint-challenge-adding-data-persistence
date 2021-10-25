const db = require('./../../data/dbConfig');

const getAll = () => {
  return db('tasks as t')
    .leftJoin('projects as p', 'p.project_id', 't.project_id')
    .select(
      'task_id',
      'task_description',
      'task_notes',
      'task_completed',
      'project_name',
      'project_description'
    );
};

const insert = (task) => {
  return db('tasks')
    .insert(task)
    .returning('task_id')
    .then((task_id) => {
      return db('tasks').where({ task_id }).first();
    });
};

module.exports = {
  getAll,
  insert,
};
