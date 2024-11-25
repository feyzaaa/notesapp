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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = require("../models/User");
const Note_1 = require("../models/Note");
const database_1 = __importDefault(require("../database"));
const usersRouter = (0, express_1.Router)();
// Create a new user
usersRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { displayname, username, pw, role } = req.body;
        const newUser = new User_1.User(displayname, username, pw, role);
        const createdUser = yield User_1.User.create(newUser);
        res.status(201).json(createdUser);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to create user', error });
    }
}));
// Get all users
usersRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.User.getAll();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to retrieve users', error });
    }
}));
// Get a user by ID
usersRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.User.getById(parseInt(req.params.id, 10));
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to retrieve user', error });
    }
}));
// Update a user
usersRouter.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { displayname, username, pw, role } = req.body;
        const updatedUser = new User_1.User(displayname, username, pw, role);
        const success = yield User_1.User.update(parseInt(req.params.id, 10), updatedUser);
        if (success) {
            return res.status(200).json({ message: 'User updated' });
        }
        res.status(404).json({ message: 'User not found' });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to update user', error });
    }
}));
// Delete a user
usersRouter.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const success = yield User_1.User.delete(parseInt(req.params.id, 10));
        if (success) {
            return res.status(200).json({ message: 'User deleted' });
        }
        res.status(404).json({ message: 'User not found' });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to delete user', error });
    }
}));
usersRouter.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, pw } = req.body;
        // Find the user by username
        const [rows] = yield database_1.default.query('SELECT * FROM users WHERE username = ?', [username]);
        const user = rows[0];
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Check if password matches
        if (user.pw !== pw) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        // Send back user role and details
        res.status(200).json({ message: 'Login successful', role: user.role, user });
    }
    catch (error) {
        res.status(500).json({ message: 'Login failed', error });
    }
}));
usersRouter.get('/notes/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId; // Benutzer-ID aus der Anfrage-URL
    console.log('Fetching notes for userId:', userId); // Debug
    try {
        const [notes] = yield database_1.default.query('SELECT * FROM notes WHERE user_id = ?', [userId]);
        console.log('Fetched notes:', notes); // Debug
        res.json(notes);
    }
    catch (err) {
        console.error('Error fetching notes:', err); // Log the erro
        res.status(500).json({ error: 'Failed to fetch notes' });
    }
}));
usersRouter.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const success = yield database_1.default.query('DELETE FROM notes WHERE id = ?', [id]);
        if (success) {
            return res.status(200).json({ message: 'Note deleted' });
        }
        res.status(404).json({ message: 'Note not found' });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to delete note', error });
    }
}));
usersRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content, userId } = req.body;
        const newNote = new Note_1.Note(title, content, userId);
        const createdNote = yield Note_1.Note.create(newNote);
        res.status(201).json(createdNote);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to create note', error });
    }
}));
exports.default = usersRouter;
