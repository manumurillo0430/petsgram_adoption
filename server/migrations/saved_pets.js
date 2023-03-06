exports.up = function (knex) {
  return knex.schema.createTable('saved_pets', (table) => {
    table
      .integer('user_id')
      .notNullable()
      .unsigned()
      .references('users.user_id')
    table.integer('saved').notNullable()
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('saved_pets')
}
