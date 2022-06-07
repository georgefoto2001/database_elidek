const express = require('express');
const relatesController = require('../controllers/relates');

const router = express.Router();

router.get('/top3/interdisciplinary/', relatesController.getTop3Interdisciplinary);


module.exports = router;