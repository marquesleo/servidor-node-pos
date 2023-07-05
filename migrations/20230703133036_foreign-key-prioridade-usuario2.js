/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema.alterTable("personal.prioridade", tbl => {
        tbl.foreign("usuario")
        tbl.references("usuario.id")
        tbl.onDelete("RESTRICT")
        tbl.onUpdate("CASCADE");
      
      })
      .then(() => {
          console.log('CHAVE ESTRANGEIRA CRIADA COM SUCESSO.');
          // Perform other operations on the schema
          // ...
        })
        .catch((err) => {
          console.error('Error CHAVE ESTRANGEIRA DA TABELA PRIORIDADE:', err);
        })
        .finally(() => {
       
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
    .alterTable("personal.prioridade", tbl => {
      tbl.dropForeign("usuario");
    })
    .dropTableIfExists("personal.prioridade")
    .dropTableIfExists("personal.usuario");
};
