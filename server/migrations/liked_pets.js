exports.up = function (knex) {
  return knex.schema.createTable('liked_pets', function (table) {
    table
      .integer('user_id')
      .unsigned()
      .notNullable()
      .references('user_id')
      .inTable('users')
    table
      .integer('pet_id')
      .unsigned()
      .notNullable()
      .references('pet_id')
      .inTable('pets')
    table.unique(['user_id', 'pet_id'])
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('liked_pets')
}
