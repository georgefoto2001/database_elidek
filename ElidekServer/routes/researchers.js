const express = require('express');
const researchersController = require('../controllers/researchers');

const router = express.Router();

router.get('/young/active/', researchersController.get_young_researchers);
router.get('/no_deliver/', researchersController.get_researchers_no_delivery)

module.exports = router;