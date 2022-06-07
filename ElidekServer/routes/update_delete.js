const express = require('express');
const updateDeleteController = require('../controllers/update_delete');

const router = express.Router();

//shows the insertion form for each table
router.get('/', updateDeleteController.getUpdateDeleteForm);


module.exports = router;