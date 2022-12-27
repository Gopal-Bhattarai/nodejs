import cors from 'cors';
import express from 'express';
import isAuthenticated from '../middleware/Auth.js';
import corsOptions from '../middleware/corsOptions.js';
import { getNotes, addNote, updateNote, deleteNote } from '../controllers/notesController.js';

const noteRouter = express.Router();

noteRouter.options("*",cors());
noteRouter.use(express.json());

//Route to fetch all notes for corresponding user: Login required
noteRouter.get('/fetchallnotes', isAuthenticated, cors(corsOptions), getNotes)

//Route to create a new note for corresponding user: Login required
noteRouter.post('/addnote', isAuthenticated, cors(corsOptions), addNote)

//Route to update a new note for corresponding user: Login required
noteRouter.put('/updatenote/:id', isAuthenticated, cors(corsOptions), updateNote)

//Route to delete a new note for corresponding user: Login required
noteRouter.delete('/deletenote/:id', isAuthenticated, cors(corsOptions), deleteNote)

export default noteRouter;