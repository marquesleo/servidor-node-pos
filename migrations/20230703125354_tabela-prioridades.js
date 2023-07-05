/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema.createTable("personal.prioridade", tbl => {
      tbl.uuid('id').primary;
      tbl.text("descricao",200).notNullable();
      tbl.integer("valor").notNullable();
      tbl.boolean("ativo").notNullable();
      tbl.uuid("usuario").notNullable();
      tbl.boolean("feito");
    
    })
    .then(() => {
        console.log('TABELA PRIORIDADE CRIADA.');
        // Perform other operations on the schema
        // ...
      })
      .catch((err) => {
        console.error('Error creating TABELA PRIORIDADE:', err);
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
    knex.schema.dropTableIfExists("personal.prioridade");
  };
  