const db = require('../database/connection');

class NoteController {
    async createNote(req, res) {
        try {
            const { title, content } = req.body;
            const [result] = await db.execute(
                'INSERT INTO notes (title, content) VALUES (?, ?)', 
                [title, content]
            );
            res.status(201).json({ id: result.insertId });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getAllNotes(req, res) {
        try {
            const [notes] = await db.query('SELECT * FROM notes ORDER BY updated_at DESC');
            res.json(notes);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async searchNotes(req, res) {
        try {
            const { query } = req.query;
            const [notes] = await db.execute(
                'SELECT * FROM notes WHERE title LIKE ? ORDER BY updated_at DESC', 
                [`%${query}%`]
            );
            res.json(notes);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateNote(req, res) {
        try {
            const { id } = req.params;
            const { title, content } = req.body;
            await db.execute(
                'UPDATE notes SET title = ?, content = ? WHERE id = ?', 
                [title, content, id]
            );
            res.status(200).json({ message: 'Note updated successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteNote(req, res) {
        try {
            const { id } = req.params;
            await db.execute('DELETE FROM notes WHERE id = ?', [id]);
            res.status(200).json({ message: 'Note deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new NoteController();