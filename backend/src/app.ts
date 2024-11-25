import express from 'express';
import dotenv from 'dotenv';
import notesRouter from './routes/notes';
import usersRouter from './routes/users';
import cors from 'cors';


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Backend is working!');
});

app.use('/api/notes', notesRouter);
app.use('/api/users', usersRouter);


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
