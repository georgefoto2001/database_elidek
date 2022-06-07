const express = require('express');
const updateController = require('../controllers/update');

const router = express.Router();

//shows the insertion form for each table
router.post('/:table_name', updateController.postUpdate);


module.exports = router;