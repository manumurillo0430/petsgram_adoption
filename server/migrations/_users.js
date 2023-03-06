exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('user_id').primary()
    table.boolean('role').notNull
    table.string('picture')
    table.string('firstname').notNull
    table.string('lastname')
    table.string('email').notNull
    table.string('password').notNull
    table.string('bio')
    table.string('phonenumber')
    table.boolean('is_private')
    table.timestamp('created_at').defaultTo(knex.fn.now())
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('users')
}
