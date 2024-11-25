import { Router } from 'express';
import { User } from '../models/User';
import { Note } from '../models/Note';
import pool from '../database';

const usersRouter = Router();

// Create a new user
usersRouter.post('/', async (req, res) => {
  try {
    const { displayname, username, pw, role } = req.body;
    const newUser = new User(displayname, username, pw, role);
    const createdUser = await User.create(newUser);
    res.status(201).json(createdUser);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create user', error });
  }
});

// Get all users
usersRouter.get('/', async (req, res) => {
  try {
    const users = await User.getAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve users', error });
  }
});

// Get a user by ID
usersRouter.get('/:id', async (req, res) :Promise<any> => {
  try {
    const user = await User.getById(parseInt(req.params.id, 10));
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve user', error });
  }
});

// Update a user
usersRouter.put('/:id', async (req, res) :Promise<any> =>  {
  try {
    const { displayname, username, pw, role } = req.body;
    const updatedUser = new User(displayname, username, pw, role);
    const success = await User.update(parseInt(req.params.id, 10), updatedUser);
    if (success) {
      return res.status(200).json({ message: 'User updated' });
    }
    res.status(404).json({ message: 'User not found' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update user', error });
  }
});

// Delete a user
usersRouter.delete('/:id', async (req, res) :Promise<any> =>  {
  try {
    const success = await User.delete(parseInt(req.params.id, 10));
    if (success) {
      return res.status(200).json({ message: 'User deleted' });
    }
    res.status(404).json({ message: 'User not found' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete user', error });
  }
});

usersRouter.post('/login', async (req, res) :Promise<any> =>  {
    try {
      const { username, pw } = req.body;
  
      // Find the user by username
      const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
      const user = (rows as any)[0];
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Check if password matches
      if (user.pw !== pw) {
        return res.status(401).json({ message: 'Invalid password' });
      }
  
      // Send back user role and details
      res.status(200).json({ message: 'Login successful', role: user.role, user });
    } catch (error) {
      res.status(500).json({ message: 'Login failed', error });
    }
  });
  
  usersRouter.get('/notes/:userId', async (req, res): Promise<any> => {
    const userId = req.params.userId; // Benutzer-ID aus der Anfrage-URL
    console.log('Fetching notes for userId:', userId); // Debug
    try {
        const [notes] = await pool.query('SELECT * FROM notes WHERE user_id = ?', [userId]);
        console.log('Fetched notes:', notes); // Debug
        res.json(notes);
    } catch (err) {
        console.error('Error fetching notes:', err); // Log the erro
        res.status(500).json({ error: 'Failed to fetch notes' });
    }
  });

  usersRouter.delete('/:id', async (req, res): Promise<any> => {
    const id = req.params.id
    try {
      const success = await pool.query('DELETE FROM notes WHERE id = ?', [id]);
      if (success) {
        return res.status(200).json({ message: 'Note deleted' });
      }
      res.status(404).json({ message: 'Note not found' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete note', error });
    }
  });

  usersRouter.post('/', async (req, res) => {
    try {
      const { title, content, userId } = req.body;
      const newNote = new Note(title, content, userId);
      const createdNote = await Note.create(newNote);
      res.status(201).json(createdNote);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create note', error });
    }
  });

export default usersRouter;
