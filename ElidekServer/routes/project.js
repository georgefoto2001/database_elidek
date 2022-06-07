const express = require('express');
const projectController = require('../controllers/project');

const router = express.Router();


router.get('/', projectController.get_condition_form);
router.get('/conditions', projectController.get_projects_of_cond);

router.get('/by_researcher', projectController.get_projects_by_researcher);
router.get('/by_org', projectController.get_projects_by_org);

//show the researhers of the project with project_id (param)
router.get('/researchers/:project_id', projectController.get_researchers_of_project);


module.exports = router;