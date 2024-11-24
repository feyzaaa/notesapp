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
exports.Note = void 0;
const database_1 = __importDefault(require("../database"));
class Note {
    constructor(title, content, id) {
        this.title = title;
        this.content = content;
        this.id = id;
    }
    // Create a new note
    static create(note) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield database_1.default.execute('INSERT INTO notes (title, content) VALUES (?, ?)', [note.title, note.content]);
            note.id = result.insertId;
            return note;
        });
    }
    // Get all notes
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield database_1.default.query('SELECT * FROM notes');
            return rows;
        });
    }
    // Get a note by ID
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield database_1.default.query('SELECT * FROM notes WHERE id = ?', [id]);
            if (rows.length === 0)
                return null;
            return rows[0];
        });
    }
    // Update a note
    static update(id, note) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield database_1.default.execute('UPDATE notes SET title = ?, content = ? WHERE id = ?', [note.title, note.content, id]);
            return result.affectedRows > 0;
        });
    }
    // Delete a note
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield database_1.default.execute('DELETE FROM notes WHERE id = ?', [id]);
            return result.affectedRows > 0;
        });
    }
}
exports.Note = Note;
