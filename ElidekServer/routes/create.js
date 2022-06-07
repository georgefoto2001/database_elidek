const express = require('express');
const createController = require('../controllers/create');

const router = express.Router();

//shows the insertion form for each table
router.get('/form/', createController.getCreateForm);

//inserts the data in each table
router.post('/:table_name/', createController.postInsert);


module.exports = router;