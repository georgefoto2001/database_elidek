const express = require('express');
const controller = require('../controllers/field');

const router = express.Router();

router.get('/hot/', controller.get_field_form);

router.get('/hot/result/', controller.get_field_form_result);


module.exports = router;