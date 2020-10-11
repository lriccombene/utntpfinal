const userModel = require("../models/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
module.exports = {
    /*validate: async (req, res, next) => {
        try{
            console.log(req.query)
            const userAdmin = await usersAdminModel.findOne({user:req.body.user});
            if(userAdmin){
                if(bcrypt.compareSync(req.body.password,userAdmin.password)){
                    //User y password ok, generar token
                    const token = jwt.sign({userId:userAdmin._id},req.app.get("secretKey"),{expiresIn:"1h"});
                    res.json({message:"usuario ok",token:token});
                }else{
                    res.json({message:"password incorrecto"});
                }
            }else{
                res.json({message:"usuario incorrecto"});
            }
        }catch(e){
            next(e)
        }

    },*/
    validate: async (req, res, next) => {
        try{
            console.log(req.query)
            const {error,message,user} = await userModel.validateUser(req.body.user,req.body.password);
            if(!error){
                const token = jwt.sign({userId:user._id},req.app.get("secretKey"),{expiresIn:"1h"});
                res.json({message:message,token:token});
                return;
            }
            res.json({message:message});
            console.log(error,message)

        }catch(e){
            next(e)
        }

    },
    create: async function (req, res, next) {
        try{
            console.log(req.body);
            const user = new userModel({
                name: req.body.name,
                user:req.body.user,
                password:req.body.password
            })
            const document = await user.save();
            res.json(document);
        }catch(e){
            next(e)
        }

    },
    getAll:async (req, res, next)=> {
      try{
          console.log(req.body.tokenData)

          let queryFind={};
          if(req.query.buscar){
              queryFind={name:{$regex:".*"+req.query.buscar+".*",$options:"i"}} //buscar por nombre similar al like
          }
          console.log(queryFind)
          const usuario = await userModel.paginate(queryFind,{

              //sort:{[req.query.sort]:req.query.sortOrder},
              sort:{name:1},
              populate:"category",
              limit:req.query.limit || 10,
              page:req.query.page || 1 //numero de pagina
          });
          res.status(200).json(usuario);
      }catch(e){
          next(e)
      }
    },
    getById:async (req, res, next)=> {
      try{
          console.log(req.params.id);
          const usuario = await userModel.findById(req.params.id);
          if(!usuario){
              res.status(200).json({msg:"no existe el usuario"})
              return; //Siempre despues de un res un return
          }
          res.status(200).json(usuario);
      }catch(e){
          next(e)
      }

    },
    update:async (req, res, next)=> {
      try{
          console.log(req.params.id, req.body);
          const usuario = await userModel.update({ _id: req.params.id }, req.body, { multi: false })
          res.status(200).json(usuario);
      }catch(e){
          next(e)
      }
    },
    delete:async (req, res, next)=> {
      try{
          console.log(req.params.id);
          const data = await userModel.deleteOne({ _id: req.params.id });
          res.status(200).json(data);
      }catch(e){
          next(e)
      }
    }

}
