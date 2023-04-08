exports.up = function (knex) {
  return knex.schema.createTable('pets', (table) => {
    table.increments('pet_id').primary()
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
    table.integer('total_likes')
    table.timestamp('created_at').defaultTo(knex.fn.now())
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('pets')
}
