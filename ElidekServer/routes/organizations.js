const express = require('express');
const orgController = require('../controllers/organizations');

const router = express.Router();

router.get('/programs/two_consecutive/10_per_year', orgController.getOrganizationsLastTwo);


module.exports = router;