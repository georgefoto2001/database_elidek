const express = require('express');
const executivesController = require('../controllers/executives');

const router = express.Router();

router.get('/top5/', executivesController.get_top5_executives);


module.exports = router;