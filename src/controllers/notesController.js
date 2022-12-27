import expressAsyncHadler from 'express-async-handler'
import Note from '../models/notes.js'

const getNotes = expressAsyncHadler(async(req, res)=>{
    try {
        const note = await Note.find({user: req.user.id});
        res.json(note);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(403).send(error.message);
    }
});

const addNote = expressAsyncHadler(async(req, res)=>{
    try {
        const {title, description, tag } = req.body;
        const note = new Note ({
            title, description, tag, user: req.user.id
        })
        const saveNote = await note.save()
        res.json(saveNote)
    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(403).send(error.message);
    }
})

const updateNote = expressAsyncHadler(async(req, res)=>{
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
        res.status(403).send(error.message);
    }
})

const deleteNote = expressAsyncHadler(async(req, res)=>{
    try {
        const id = req.params.id;
        const note = await Note.findOne({_id: req.params.id, user: req.user.id});
        
        //find a note with same user token to be deleted
        if(!note) {return res.status(404).send("Not Available")}

        //delete if found
        await note.deleteOne();

        res.status(200).json({message: "Deleted"})
    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(403).send(error.message);
    }
})

export {
    getNotes,  addNote, updateNote, deleteNote
}