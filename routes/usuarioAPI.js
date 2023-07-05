const express = require("express");
const routerSeg = express.Router();
const knex = require('knex')(require('../knexfile.js').development);
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const { json } = require("body-parser");


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


routerSeg.post("",(req,res) => {
    
    const uuid = uuidv4();
    let jsonusuario = req.body
   
   const usuario = {
      id :uuid,
      password:bcrypt.hashSync(jsonusuario.Password,10),
      username:jsonusuario.Username,
      email:jsonusuario.Email,
      situacao: "A"  
    };
    console.log(usuario);
    knex('personal.usuario')
    .insert(usuario, ['id'])
    .then(ret => {
        let id = ret[0].id
        res.status(201).json({ "message" : "Usuario criado com sucesso",id})
    })
    .catch(err => {
        res.status(400).json({"message": err.message})
    })
})

routerSeg.put("/:id", checkToken, (req,res) => {
    const id = req.params.id.toString();
    console.log(id);
    let usuario = req.body
    console.log(usuario);
    knex('personal.usuario')
    
    .update({
        
        "username": usuario.username,
        "password":bcrypt.hashSync(usuario.password,10),
        "situacao": usuario.situacao,
        "email": usuario.email
    })
    .where("id",'=', id)
    .then(ret => {
        console.log("alterou");
        res.status(201).json({"message" : "Usuario alterado com sucesso"})
    })
    .catch(err => {
        console.log(err);
        res.status(400).json({"message": err.message})
    })
})


routerSeg.get ('/:id',checkToken, (req, res) => {
   const id = req.params.id;
    knex('personal.usuario')

        .select('*')

        .where('id', id)

        .then (usuarios => {

            if (usuarios.length == 0) {

                res.status(401).json({ "message": "Usuario nao encontrado" })

            }

            else {

                const usuario = usuarios[0]
                res.status(200).json(usuario);            

            }

        })

})

routerSeg.get ('/',checkToken, (req, res) => {
    const id = req.params.id;
     knex('personal.usuario')
        .select('*')
        .then (usuarios => {
 
             if (usuarios.length == 0) {
 
                 res.status(401).json({ "message": "Usuario nao encontrado" })
 
             }
 
             else {
                 
                 res.status(200).json(usuarios);            
 
             }
 
         })
 
 })

 routerSeg.delete ('/:id',checkToken, (req, res) => {
    const id = req.params.id;
     knex('personal.usuario')
        .delete()
        .where('id', id)
        .then(ret => {
          
            res.status(201).json({"message" : "Usuario excluido com sucesso"})
        })
        .catch(err => {
          
            res.status(400).json({"message": err.message})
        })
 
 })


routerSeg.post ('/autenticar', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    knex('personal.usuario')

        .select('*')

        .where('username', username)

        .then (usuarios => {

            if (usuarios.length == 0) {

                res.status(401).json({ "message": "Usuário ou senha incorretos" })

            }

            else {

                const usuario = usuarios[0]
               if (bcrypt.compareSync(password,usuario.password)){     
                   jwt.sign({ id: usuario.id, username:usuario.username }, process.env.PRIVATE_KEY,

                        { algorithm: 'HS256', expiresIn: '1h' }, (err, token) => {

                            res.status(200).json({

                                "message": "Login realizado com sucesso",
                                "id": usuario.id,
                                "username": usuario.username,    
                                "token": token,
                                "refreshtoken":""

                            })

                        })

                }

                else {

                    res.status(401).json({ "message": "Senha inválida" })

                }

            }

        })

})

module.exports = routerSeg;