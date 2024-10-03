var express = require('express');
var router = express.Router();
var usuarioController = require('../controllers/usuarioController');

router.get('/', usuarioController.list);
router.get('/create', usuarioController.create_get);
router.post('/create', usuarioController.create);

module.exports = router;
