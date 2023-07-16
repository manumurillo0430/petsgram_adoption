exports.up = function (knex) {
  return knex.schema.createTable('pet_requests', function (table) {
    table.integer('user_id')
    table.string('request')
    table.string('type').notNull
    table.string('name').notNull
    table.string('adoptionStatus').notNull
    table.string('picture').notNull
    table.integer('weight')
    table.integer('height')
    table.string('color')
    table.boolean('hypoallergenic')
    table.string('dietary')
    table.string('bio')
    table.string('breed').notNull
    table.timestamp('created_at').defaultTo(knex.fn.now())
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('pet_requests')
}
