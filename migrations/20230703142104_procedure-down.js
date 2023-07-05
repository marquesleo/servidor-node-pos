/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    const alterTableQuery = `CREATE OR REPLACE PROCEDURE personal.sp_down(IN vid uuid)
    LANGUAGE plpgsql
   AS $procedure$
    DECLARE  
       sel_prioridade personal.prioridade%rowtype;
       sel_prioridade_proximo personal.prioridade%rowtype;
   begin
         /* 1 - A
          * 2 - B
          * 3 - C
          * 4
          */
         select * from personal.prioridade into sel_prioridade where id=vid; --2 - B
         
         
         select * from personal.prioridade into sel_prioridade_proximo where valor > sel_prioridade.valor limit 1; --3 - C
      
                                            --2 + 1 = 3						
         update personal.prioridade set valor=sel_prioridade_proximo.valor where id=vid;
                                              -- 3
         update personal.prioridade set valor=sel_prioridade.valor where id=sel_prioridade_proximo.id;
     
   END $procedure$
   ;`;
  return knex.raw(alterTableQuery)
   .then(() => {
          console.log('PROCEDURE DOWN CRIADA COM SUCESSO.');
          // Perform other operations on the schema
          // ...
        })
        .catch((err) => {
          console.error('Error ao criar procedure DOWN:', err);
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
    .raw('DROP PROCEDURE personal.sp_down;')
  
};
