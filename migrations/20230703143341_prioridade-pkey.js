/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    const alterTableQuery = `
    ALTER TABLE personal.prioridade ADD CONSTRAINT pk_prioridade primary key(id);
    `;
  return knex.raw(alterTableQuery)
   .then(() => {
          console.log('CHAVE PRIMARIA CRIADA COM SUCESSO.');
          // Perform other operations on the schema
          // ...
        })
        .catch((err) => {
          console.error('Error CHAVE PRIMARIA DA TABELA PRIORIDADE:', err);
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
    .raw('ALTER TABLE prioridade DROP CONSTRAINT pk_prioridade;')
  
};
