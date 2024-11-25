import pool from '../database';

export class Note {
  id?: number;
  title: string;
  content: string;

  constructor(title: string, content: string, id?: number) {
    this.title = title;
    this.content = content;
    this.id = id;
  }

  // Create a new note
  static async create(note: Note): Promise<Note> {
    const [result] = await pool.execute(
      'INSERT INTO notes (title, content) VALUES (?, ?)',
      [note.title, note.content]
    );
    note.id = (result as any).insertId;
    return note;
  }

  // Get all notes
  static async getAll(): Promise<Note[]> {
    const [rows] = await pool.query('SELECT * FROM notes');
    return rows as Note[];
  }

  // Get a note by ID
  static async getById(id: number): Promise<Note | null> {
    const [rows] = await pool.query('SELECT * FROM notes WHERE user_id = ?', [id]);
    if ((rows as any).length === 0) return null;
    return (rows as any)[0] as Note;
  }

  // Update a note
  static async update(id: number, note: Note): Promise<boolean> {
    const [result] = await pool.execute(
      'UPDATE notes SET title = ?, content = ? WHERE id = ?',
      [note.title, note.content, id]
    );
    return (result as any).affectedRows > 0;
  }

  // Delete a note
  static async delete(id: number): Promise<boolean> {
    const [result] = await pool.execute('DELETE FROM notes WHERE id = ?', [id]);
    return (result as any).affectedRows > 0;
  }
}
