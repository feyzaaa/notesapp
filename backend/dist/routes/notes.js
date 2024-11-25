"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Note_1 = require("../models/Note");
console.log('Note Model:', Note_1.Note);
const notesRouter = (0, express_1.Router)();
// Create a new note
notesRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content, user_id } = req.body;
        const newNote = new Note_1.Note(title, content, user_id);
        const createdNote = yield Note_1.Note.create(newNote);
        res.status(201).json(createdNote);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to create note', error });
    }
}));
notesRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('GET /api/notes endpoint hit');
    try {
        const notes = yield Note_1.Note.getAll(); // `await` hinzufügen
        console.log('Notes fetched:', notes);
        res.status(200).json(notes);
    }
    catch (error) {
        console.error('Error fetching notes:', error);
        res.status(500).json({ message: 'Failed to retrieve notes', error });
    }
}));
// Get a note by ID
notesRouter.get('/notes/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const note = yield Note_1.Note.getById(parseInt(req.params.id, 10));
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.status(200).json(note);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to retrieve note', error });
    }
}));
// Update a note
notesRouter.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content, user_id } = req.body;
        const updatedNote = new Note_1.Note(title, content, user_id);
        const success = yield Note_1.Note.update(parseInt(req.params.id, 10), updatedNote);
        if (success) {
            return res.status(200).json({ message: 'Note updated' });
        }
        res.status(404).json({ message: 'Note not found' });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to update note', error });
    }
}));
// Delete a note
notesRouter.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const success = yield Note_1.Note.delete(parseInt(req.params.id, 10));
        if (success) {
            return res.status(200).json({ message: 'Note deleted' });
        }
        res.status(404).json({ message: 'Note not found' });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to delete note', error });
    }
}));
exports.default = notesRouter;
