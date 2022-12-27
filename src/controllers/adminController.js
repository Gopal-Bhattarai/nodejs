import expresAsyncHandler from 'express-async-handler'
import Note from '../models/notes.js';
import User from '../models/users.js';

const getAllUsers = expresAsyncHandler( async (req, res) => {
    //const { email, password, ...rest } = req.body;
    try {
      const users = await User.find({}).select("-password");
      res.status(200).json(users);
    } catch (error) {
      console.log(`Error: ${error.message}`);
      res.status(400).json({message: error.message});
    }
  });

  const deleteUser = expresAsyncHandler(async (req, res) => {
    try {
      const id = req.params.id;
      const user = await User.findByIdAndDelete(id);
      if(!user) {
        return res.status(400).json({message: 'User not found'});
      }
      res.status(200).json({message: 'User Deleted'});
    } catch (error) {
      console.log(`Error: ${error.message}`);
      res.status(400).json({message: error.message});
    }
  })

  const getAllNotes = expresAsyncHandler(async(req, res)=>{
    try {
        const note = await Note.find({})
        .populate('user')
        .then(function(data){
          res.status(200).json(data)
        })
        
        // let obj = [];
        // note.map( async (e)=>{
        //     const noteUser = await User.findById({_id: e.user})
        //     // console.log(e);
        //     const {_id, title, description, user} = e;

        //     obj.push({_id, title, description, user: noteUser.fullName});
        //     console.log(obj);
        // })


        // res.status(200).json(note)

    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(403).send(error.message);
    }
})

const deleteNote = expresAsyncHandler(async(req, res)=>{
    try {
        const id = req.params.id;
        const note = await Note.findOne({_id: req.params.id});
        
        //find a note with same user token to be deleted
        if(!note) {return res.status(404).send("Not Available")}

        //delete if found
        await note.deleteOne();

        res.status(200).json({message: "Deleted"})
    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(403).send(error.message);
    }
});

  export {getAllUsers, deleteUser, getAllNotes, deleteNote}