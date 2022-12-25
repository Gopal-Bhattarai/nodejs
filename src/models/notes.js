import mongoose from 'mongoose'
import validator from 'validator';

const noteSchema = mongoose.Schema({
    title:{
        type: String,
        required: true,
        validate(value) {
            if(!validator.isLength(value, {min:3, max: 50})){
                throw new Error ('Must be at 3 to 50 characters');
            }
        }
    },
    description: {
        type: String,
        required: true,
        validate(value) {
            if(!validator.isLength(value, {min: 6})){
                throw new Error ('Minimum 6 characters');
            }
        }
    },
    tag: {
        type: String,
        default: 'General'
    },
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
})

const Note = mongoose.model("Note", noteSchema);

export default Note;