// const request = require('supertest');
// const express = require('express');
// const notesRouter = require('../../src/routes/notes').default;

// // Mocking the Note model
// jest.mock('../../src/models/Note', () => {
//   return {
//     Note: {
//       getAll: jest.fn().mockResolvedValue([
//         { id: 1, title: 'Test Note', content: 'This is a test note' },
//         { id: 2, title: 'Another Note', content: 'This is another test note' },
//       ]),
//     },
//   };
// });

// const app = express();
// app.use(express.json());
// app.use('/api/notes', notesRouter);

// describe('Notes API', () => {
//   it('should return all notes', async () => {
//     const response = await request(app).get('/api/notes/GetNotes');
//     expect(response.status).toBe(200);
//     expect(response.body).toEqual([
//       { id: 1, title: 'Test Note', content: 'This is a test note' },
//       { id: 2, title: 'Another Note', content: 'This is another test note' },
//     ]);
//   });
// });
