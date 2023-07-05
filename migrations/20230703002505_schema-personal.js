/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema.createSchemaIfNotExists("personal")
    .then(() => {
        console.log('SCHEMA personal CRIADO.');
        // Perform other operations on the schema
        // ...
      })
      .catch((err) => {
        console.error('Error criar SCHEMA personal:', err);
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
    knex.schema.dropSchemaIfExists("personal");
  };
  