/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema.createTable("personal.usuario", tbl => {
      tbl.uuid('id').primary;
      tbl.text("username",100).unique().notNullable();
      tbl.text("password",100).notNullable();
      tbl.text("situacao",1).notNullable();
      tbl.text("email",200);
    })
    .then(() => {
        console.log('TABELA USUARIO CRIADA.');
        // Perform other operations on the schema
        // ...
      })
      .catch((err) => {
        console.error('Error creating TABELA USAURIO:', err);
      })
      .finally(() => {
        knex.destroy(); // Close the connection pool
      });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    knex.schema.dropTableIfExists("personal.usuario");
  };
  