var express = require('express');
var router = express.Router();
const main_controller=require('../controllers/main.controller'); 

/* GET home page. */
router.get('/', main_controller.getIndex);

/* GET about page. */
router.get('/About', main_controller.getAboutUs);

/* GET contact page. */
router.get('/Contact', main_controller.getContactUs);

/* GET login page. */
router.get('/Login', main_controller.getLogin);

/* GET Admin login page. */
router.get('/AdminLogin', main_controller.getAdminLogin);

module.exports = router;
