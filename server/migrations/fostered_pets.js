exports.up = function (knex) {
  return knex.schema.createTable('fostered_pets', (table) => {
    table
      .integer('user_id')
      .notNullable()
      .unsigned()
      .references('users.user_id')
    table.integer('fostered').notNullable()
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('fostered_pets')
}
