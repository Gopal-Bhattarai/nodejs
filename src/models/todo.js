import mongoose from "mongoose";

const todoSchema = mongoose.Schema(
    {
        desc : {
            type: String,
            required: true
        },
        completed: {
            type: Boolean,
            required: true
        },
        user :{
            type: String
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
);

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;