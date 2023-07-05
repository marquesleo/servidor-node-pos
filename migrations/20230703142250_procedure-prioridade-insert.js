/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    const alterTableQuery = `CREATE OR REPLACE PROCEDURE personal.sp_insertprioridade(IN v_descricao character varying, 
                                            IN v_ativo boolean,
                                            IN v_feito boolean,
                                            IN v_usuario_id uuid)
    LANGUAGE plpgsql
   AS $procedure$
    DECLARE  
       ultimo_valor smallint;
   begin
         select coalesce(max(valor),0) + 1 into ultimo_valor from personal.prioridade;
         
         insert into personal.prioridade(id,descricao,valor,ativo,feito,usuario)
         values(gen_random_uuid(),v_descricao,ultimo_valor,v_ativo,v_feito,v_usuario_id);
      
   
    
   END $procedure$
   ;
   
   ;`;
  return knex.raw(alterTableQuery)
   .then(() => {
          console.log('PROCEDURE INSERT PRIORIDADE CRIADA COM SUCESSO.');
          // Perform other operations on the schema
          // ...
        })
        .catch((err) => {
          console.error('Error ao criar procedure INSERT PRIORIDADE:', err);
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
