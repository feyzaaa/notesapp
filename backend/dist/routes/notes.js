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
const router = (0, express_1.Router)();
// Create a new note
router.post('/createNote', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content } = req.body;
        const newNote = new Note_1.Note(title, content);
        const createdNote = yield Note_1.Note.create(newNote);
        res.status(201).json(createdNote);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to create note', error });
    }
}));
// Get all notes
router.get('/GetNotes', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notes = yield Note_1.Note.getAll();
        res.status(200).json(notes);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to retrieve notes', error });
    }
}));
// Get a note by ID
router.get('/GetNote/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
router.put('/PutNote/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content } = req.body;
        const updatedNote = new Note_1.Note(title, content);
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
router.delete('/DeleteNote/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.default = router;
