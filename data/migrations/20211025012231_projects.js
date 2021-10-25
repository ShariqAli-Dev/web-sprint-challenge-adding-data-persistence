exports.up = function (knex) {
  knex.schema.createTable('projects', (tbl) => {
    tbl.increments('project_id');
    tbl.string('project_name').notNullable();
    tbl.string('project_description');
    tbl.boolean('project_completed').defaultTo(false);
  });
};

exports.down = function (knex) {
  knex.schema.dropIfTableExists('projects');
};
