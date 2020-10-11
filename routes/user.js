var express = require('express');
var router = express.Router();
var userController = require("../controllers/userController")
/* GET users listing. */
router.get('/', userController.getAll);
router.get('/:id', userController.getById);

//router.get('/compras', userController.getById);

router.post('/registro', userController.create)
router.post('/login', userController.validate)
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);

module.exports = router;
