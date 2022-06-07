const express = require('express');
const deleteController = require('../controllers/delete');

const router = express.Router();

//shows the insertion form for each table
router.post('/Deliverable/', deleteController.postDeleteDeliverable);


module.exports = router;