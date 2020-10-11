var express = require('express');
var router = express.Router();

var saleController = require("../controllers/saleController")

/* GET users listing. */
router.get('/', saleController.getAll);
router.get('/:id', saleController.getById);
//llamado a validateUser para verificar token
//router.post('/',(req,res,next)=>{req.app.validateUser(req,res,next)}, productsController.create);
router.post('/',saleController.create);
router.put('/:id', saleController.update);
router.delete('/:id', saleController.delete);
module.exports = router;
