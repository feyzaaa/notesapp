import express from 'express';
import dotenv from 'dotenv';
import notesRouter from './routes/notes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend is working!');
});

app.use('/api/notes', notesRouter);


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
