import pool from '../database';

export class User {
  id?: number;
  displayname: string;
  username: string;
  pw: string;
  role: 'USER' | 'ADMIN';

  constructor(displayname: string, username: string, pw: string, role: 'USER' | 'ADMIN' = 'USER', id?: number) {
    this.displayname = displayname;
    this.username = username;
    this.pw = pw;
    this.role = role;
    this.id = id;
  }

  // Create a new user
  static async create(user: User): Promise<User> {
    const [result] = await pool.execute(
      'INSERT INTO users (displayname, username, pw, role) VALUES (?, ?, ?, ?)',
      [user.displayname, user.username, user.pw, user.role]
    );
    user.id = (result as any).insertId;
    return user;
  }

  // Get all users
  static async getAll(): Promise<User[]> {
    const [rows] = await pool.query('SELECT * FROM users');
    return rows as User[];
  }

  // Get a user by ID
  static async getById(id: number): Promise<User | null> {
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    if ((rows as any).length === 0) return null;
    return (rows as any)[0] as User;
  }

  // Update a user
  static async update(id: number, user: User): Promise<boolean> {
    const [result] = await pool.execute(
      'UPDATE users SET displayname = ?, username = ?, pw = ?, role = ? WHERE id = ?',
      [user.displayname, user.username, user.pw, user.role, id]
    );
    return (result as any).affectedRows > 0;
  }

  // Delete a user
  static async delete(id: number): Promise<boolean> {
    const [result] = await pool.execute('DELETE FROM users WHERE id = ?', [id]);
    return (result as any).affectedRows > 0;
  }
}
