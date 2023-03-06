exports.up = function (knex) {
  return knex.schema.createTable('adopted_pets', (table) => {
    table
      .integer('user_id')
      .notNullable()
      .unsigned()
      .references('users.user_id')
    table.integer('adopted').notNullable()
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('adopted_pets')
}
