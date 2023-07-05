/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    const alterTableQuery = `
    ALTER TABLE personal.usuario ADD CONSTRAINT pk_usuario primary key(id);
    ALTER TABLE personal.prioridade
    ADD CONSTRAINT fk_prioridade_usuario
    FOREIGN KEY (usuario) REFERENCES personal.usuario(id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE;
  `;
  return knex.raw(alterTableQuery)
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
    .raw('ALTER TABLE prioridade DROP CONSTRAINT fk_prioridade_usuario;')
    .dropTableIfExists("personal.prioridade")
    .dropTableIfExists("personal.usuario");
};
