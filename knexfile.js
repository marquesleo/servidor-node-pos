// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
 module.exports = {

    development: {
      client: 'pg',
      connection: 'postgres://postgres:Leo141827@localhost:5432/postgres',
    },
  
    staging: {
      
    },
    
   production: {
      
   }
   
  };
  