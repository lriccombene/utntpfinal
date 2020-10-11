var express = require('express');
var router = express.Router();

var categoriesController = require("../controllers/categoriesController")

/* GET users listing. */
router.get('/', categoriesController.getAll);
router.post('/', categoriesController.create);
router.delete('/', categoriesController.delete);
module.exports = router;
