const express = require('express');

const router = express.Router();

const projectController = require('../controllers/project');


router.get('/by_researchers', projectController.getResearchers);


