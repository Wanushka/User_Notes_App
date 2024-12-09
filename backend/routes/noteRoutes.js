const express = require('express');
const router = express.Router();
const NoteController = require('../controllers/noteController');

router.post('/notes', NoteController.createNote);
router.get('/notes', NoteController.getAllNotes);
router.get('/notes/search', NoteController.searchNotes);
router.put('/notes/:id', NoteController.updateNote);
router.delete('/notes/:id', NoteController.deleteNote);

try {
    const NoteController = require('../controllers/noteController');
    console.log('Controller loaded successfully');
} catch (error) {
    console.error('Failed to load controller:', error);
}



module.exports = router;