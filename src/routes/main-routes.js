var express = require('express');
var router = express.Router();

const mainController = require('../controllers/main-controller');


/* Home */
router.get('/', mainController.home);
router.get('/config', mainController.configuration);


/* DEMOS */

router.get('/demo1', mainController.demo1);
router.get('/demo2', mainController.demo2);
router.get('/demo3', mainController.demo3);

/* OAUTH */

router.get('/auth',mainController.tnOauth) 

/** APIS */
router.get('/api/product-data', mainController.productData);


module.exports = router;
