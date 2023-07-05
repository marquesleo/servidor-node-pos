const express = require("express");
const routerSeg = express.Router();
const knex = require('knex')(require('../knexfile.js').development);
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const checkToken = (req,res, next ) => {
    const authHeader = req.get('authorization');
    console.log(authHeader);
    if (!authHeader){
        res.status(401)
        .setHeader('WWWW-Authenticate','Bearer realm="Segredo"')
        .json({"message": "Acesso nao autorizado"})
        return
    }
    const authType = authHeader.split(' ')[0]
    const token = authHeader.split(' ')[1]
    console.log(token);

    if (authType == 'Bearer'){
       jwt.verify(token, process.env.PRIVATE_KEY,(err, payload) => {
            if (err){
                res.status(403).json({"message": "Acesso nao autorizado"});
                return
            }
            req.tokenData = payload
            next()
       })
       
        
    }else{
        res.status(401).json({"message":"Acesso nao autorizado"})
    }
}


routerSeg.get ('/:id',checkToken, (req, res) => {
    const id = req.params.id;
     knex('personal.prioridade')
          .select('*')
          .where('id', id)
          .then (prioridades => {
              if (prioridades.length == 0) {
                  res.status(401).json({ "message": "Prioridade nao encontrado" })
              }
              else {
                 const prioridade = prioridades[0]
                 res.status(200).json(prioridade);            
 
             }
 
         })
 
 })
   
 routerSeg.get ('/',checkToken, (req, res) => {
    console.log('query string');
    const usuario = req.query.id_usuario;
    const feito = req.query.feito;
    const filters = {
        usuario: usuario,
        feito: feito,
      
      };
      
      let query = knex('personal.prioridade');
      
      for (const key in filters) {
        if (filters.hasOwnProperty(key)) {
          query = query.where(key, filters[key]);
        }
      }

      query
         .select()
          .then(rows => {
            if (rows.length == 0) {
                res.status(401).json({ "message": "Prioridade nao encontrado" })
            }
            else {
               const prioridade = rows;
               res.status(200).json(prioridade);            

           }
        })
        .catch(error => {
              console.error(error);
        });
 })
   
 routerSeg.post("",checkToken,(req,res) => {
   
    const uuid = uuidv4();
    let prioridade = req.body
   
   
    knex.raw('CALL personal.sp_insertprioridade(?,?,?,?);', [prioridade.descricao, prioridade.ativo, prioridade.feito,prioridade.usuario])
    .then(ret => {
       
        res.status(201).json({ "message" : "Prioridade criado com sucesso"})
    })
    .catch(err => {
        res.status(400).json({"message": err.message})
    })
})

routerSeg.post("/up",checkToken,(req,res) => {
   const prioridade = req.body;
   console.log(prioridade.id);
   knex.raw('CALL personal.sp_up(?);', [prioridade.id])
    .then(ret => {
       
        res.status(201).json({ "message" : "Prioridade UP "})
    })
    .catch(err => {
        res.status(400).json({"message": err.message})
    })
})

routerSeg.post("/down",checkToken,(req,res) => {
    const prioridade = req.body;
    knex.raw('CALL personal.sp_down(?);', [prioridade.id])
     .then(ret => {
        
         res.status(201).json({ "message" : "Prioridade DOWN "})
     })
     .catch(err => {
         res.status(400).json({"message": err.message})
     })
 })
   
routerSeg.put("/:id", checkToken, (req,res) => {
    const id = req.params.id.toString();
    
    let prioridade = req.body
    console.log(prioridade);
    knex('personal.prioridade')
    
    .update({
        
        "descricao": prioridade.descricao,
        "ativo": prioridade.ativo,
        "valor": prioridade.valor,
        "feito": prioridade.feito,
        "usuario" : prioridade.usuario

    })
    .where("id",'=', id)
    .then(ret => {
        console.log("alterou");
        res.status(201).json({"message" : "Prioridade alterada com sucesso"})
    })
    .catch(err => {
        console.log(err);
        res.status(400).json({"message": err.message})
    })
})  


routerSeg.delete ('/:id',checkToken, (req, res) => {
    const id = req.params.id;
     knex('personal.prioridade')
        .delete()
        .where('id', id)
        .then(ret => {
          
            res.status(201).json({"message" : "prioridade excluida com sucesso"})
        })
        .catch(err => {
          
            res.status(400).json({"message": err.message})
        })
 
 })
   
   module.exports = routerSeg;