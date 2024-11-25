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
exports.User = void 0;
const database_1 = __importDefault(require("../database"));
class User {
    constructor(displayname, username, pw, role = 'USER', id) {
        this.displayname = displayname;
        this.username = username;
        this.pw = pw;
        this.role = role;
        this.id = id;
    }
    // Create a new user
    static create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield database_1.default.execute('INSERT INTO users (displayname, username, pw, role) VALUES (?, ?, ?, ?)', [user.displayname, user.username, user.pw, user.role]);
            user.id = result.insertId;
            return user;
        });
    }
    // Get all users
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield database_1.default.query('SELECT * FROM users');
            return rows;
        });
    }
    // Get a user by ID
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield database_1.default.query('SELECT * FROM users WHERE id = ?', [id]);
            if (rows.length === 0)
                return null;
            return rows[0];
        });
    }
    // Update a user
    static update(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield database_1.default.execute('UPDATE users SET displayname = ?, username = ?, pw = ?, role = ? WHERE id = ?', [user.displayname, user.username, user.pw, user.role, id]);
            return result.affectedRows > 0;
        });
    }
    // Delete a user
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield database_1.default.execute('DELETE FROM users WHERE id = ?', [id]);
            return result.affectedRows > 0;
        });
    }
}
exports.User = User;
