import express, { Application }  from 'express';
import dotenv from 'dotenv';
import notesRouter from './routes/notes';
import usersRouter from './routes/users';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './../swagger-output.json';
import swaggerFile2 from './../swagger-output-notes.json';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;


app.use(express.json());
app.use('/person', usersRouter);
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use('/docn', swaggerUi.serve, swaggerUi.setup(swaggerFile2));
app.use(cors());

app.get('/', (req, res) => {
  res.send('Backend is working!');
});

app.use('/api/notes', notesRouter);
app.use('/api/users', usersRouter);


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
