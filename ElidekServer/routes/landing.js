const express = require('express');
const controller = require('../controllers/landing');

const router = express.Router();

router.get('/', controller.getMainPage);


module.exports = router;