import cors from 'cors';
import express from 'express';
import fetchuser from '../middleware/fetchuser.js';
import Note from '../models/notes.js'
import corsOptions from './corsOptions.js';

const noteRouter = express.Router();

noteRouter.options("*",cors());
noteRouter.use(express.json());

//Route to fetch all notes for corresponding user: Login required
noteRouter.get('/fetchallnotes', fetchuser, cors(corsOptions), async(req, res)=>{
    try {
        const note = await Note.find({user: req.user.id});
        res.json(note);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(400).send(error.message);
    }
})

//Route to create a new note for corresponding user: Login required
noteRouter.post('/addnote', fetchuser, cors(corsOptions), async(req, res)=>{
    try {
        const {title, description, tag } = req.body;
        const note = new Note ({
            title, description, tag, user: req.user.id
        })
        const saveNote = await note.save()
        res.json(saveNote)
    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(400).send(error.message);
    }
})

//Route to update a new note for corresponding user: Login required
noteRouter.put('/updatenote/:id', fetchuser, cors(corsOptions), async(req, res)=>{
    try {
        const {title, description, tag} = req.body;

        //find a note with same user token to be updated
        const note = await Note.findOne({_id: req.params.id, user: req.user.id});
 
        if(!note) {return res.status(404).send("Not Available")}
  
        if(title){note.title=title};
        if(description){note.description=description};
        if(tag){note.tag=tag};
        //update the note
        await note.save();
        res.status(200).send({note})
    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(400).send(error.message);
    }
})

//Route to delete a new note for corresponding user: Login required
noteRouter.delete('/deletenote/:id', fetchuser, cors(corsOptions), async(req, res)=>{
    try {
        const id = req.params.id;
        const note = await Note.findOne({_id: req.params.id, user: req.user.id});
        
        //find a note with same user token to be deleted
        if(!note) {return res.status(404).send("Not Available")}

        //delete if found
        await note.deleteOne();

        res.status(200).send('Deleted')
    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(400).send(error.message);
    }
})

export default noteRouter;