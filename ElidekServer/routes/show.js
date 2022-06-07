const express = require('express');
const showController = require('../controllers/show');

const router = express.Router();

//shows the insertion form for each table
router.get('/', showController.getDisplayTable);



module.exports = router;