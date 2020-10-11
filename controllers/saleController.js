const ventaModel = require("../models/ventaModels");
const productoModel = require("../models/productoModel")
const userModel = require("../models/userModel")
module.exports = {
    getAll: async (req, res, next) => {
        try{
            console.log(req.body.tokenData)
            const venta = await ventaModel.find({}).populate("venta").sort({denominacion:1});
            res.status(200).json(venta);
        }catch(e){
            next(e)
        }

    },
    getById: async function (req, res, next) {
        try{
            console.log(req.params.id);
            const venta = await ventaModel.findById(req.params.id);
            if(!venta){
                res.status(200).json({msg:"no existe el venta"})
                return; //Siempre despues de un res un return
            }
            res.status(200).json(venta);
        }catch(e){
            next(e)
        }

    },
    create: async function (req, res, next) {
        console.log(req.body);
        try{
            const producto = await productoModel.findBydIdAndValidate(req.body.producto);
            if(producto.error){
                res.json(producto);
                return;
            }
            const user = await userModel.findBydIdAndValidate(req.body.user);
            if(user.error){
                res.json(user);
                return;
            }

            const venta = new ventaModel({
                fecha: req.body.fecha,
                usuario: req.body.usuario,
                producto:  producto._id,
                user:  user._id,
                importe: req.body.importe
            })
            console.log(req.body.tags)
            const document = await  venta.save();

            res.status(201).json(document);
        }catch(e){
            console.log(e)
            //e.status=204;
            next(e);
        }

    },
    update: async function (req, res, next) {
        try{
            console.log(req.params.id, req.body);
            const venta = await ventaModel.update({ _id: req.params.id }, req.body, { multi: false })
            res.status(200).json(venta);
        }catch(e){
            next(e)
        }

    },
    delete: async function (req, res, next) {
        try{
            console.log(req.params.id);
            const data = await ventaModel.deleteOne({ _id: req.params.id });
            res.status(200).json(data);
        }catch(e){
            next(e)
        }

    }
}
