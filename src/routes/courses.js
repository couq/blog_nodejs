const express = require('express');
const router = express.Router();

const coursesController = require('../app/controllers/CoursesController');

// page stored
router.post('/handle-restored-actions', coursesController.handleRestoredActions,
);

// page trash
router.post('/handle-trash-actions', coursesController.handleTrashActions);

// create
router.get('/create', coursesController.create);
router.post('/store', coursesController.store);

// update
router.get('/edit/:id', coursesController.edit);
router.put('/:id', coursesController.update);

// soft delete
router.delete('/:id', coursesController.delete);

// froce delete
router.delete('/:id/force', coursesController.forceDelete);

// restore
router.patch('/:id/restore', coursesController.restore);

router.get('/:slug', coursesController.show);

module.exports = router;
