import { Router } from 'express';
import { Note } from '../models/Note';
console.log('Note Model:', Note);
import pool from '../database';

const notesRouter = Router();

// Create a new note
notesRouter.post('/', async (req, res) => {
  try {
    const { title, content } = req.body;
    const newNote = new Note(title, content);
    const createdNote = await Note.create(newNote);
    res.status(201).json(createdNote);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create note', error });
  }
});

notesRouter.get('/', async (req, res) => {
  console.log('GET /api/notes endpoint hit');
  try {
    const notes = await Note.getAll(); // `await` hinzufügen
    console.log('Notes fetched:', notes);
    res.status(200).json(notes);
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).json({ message: 'Failed to retrieve notes', error });
  }
});



// Get a note by ID
notesRouter.get('/notes/:id', async (req, res):Promise<any> => {
  try {
    const note = await Note.getById(parseInt(req.params.id, 10));
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve note', error });
  }
});

// Update a note
notesRouter.put('/:id', async (req, res):Promise<any> => {
  try {
    const { title, content } = req.body;
    const updatedNote = new Note(title, content);
    const success = await Note.update(parseInt(req.params.id, 10), updatedNote);
    if (success) {
      return res.status(200).json({ message: 'Note updated' });
    }
    res.status(404).json({ message: 'Note not found' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update note', error });
  }
});

// Delete a note
notesRouter.delete('/:id', async (req, res): Promise<any> => {
  try {
    const success = await Note.delete(parseInt(req.params.id, 10));
    if (success) {
      return res.status(200).json({ message: 'Note deleted' });
    }
    res.status(404).json({ message: 'Note not found' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete note', error });
  }
});



export default notesRouter;
