/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    const alterTableQuery = `CREATE OR REPLACE PROCEDURE personal.sp_up(IN vid uuid)
    LANGUAGE plpgsql
   AS $procedure$
    DECLARE  
       sel_prioridade personal.prioridade%rowtype;
       sel_prioridade_anterior personal.prioridade%rowtype;
   begin
         /* a - 1
          * b - 2
          * c - 3
          * d - 4
          */
         select * from personal.prioridade into sel_prioridade where id=vid; --2
         select * from personal.prioridade into sel_prioridade_anterior 
                      where valor < sel_prioridade.valor 
                      and personal.prioridade.feito = false  limit 1; --1
        
                                            --2 - 1 = 1						
         update personal.prioridade set valor=sel_prioridade_anterior.valor where id=vid;
                                              -- 2
         update personal.prioridade set valor=sel_prioridade.valor where id=sel_prioridade_anterior.id;
     
   END $procedure$
   ;
   `;
  return knex.raw(alterTableQuery)
   .then(() => {
          console.log('PROCEDURE UP  CRIADA COM SUCESSO.');
          // Perform other operations on the schema
          // ...
        })
        .catch((err) => {
          console.error('Error ao criar procedure UP:', err);
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
    .raw('DROP PROCEDURE personal.sp_up;')
  
};
