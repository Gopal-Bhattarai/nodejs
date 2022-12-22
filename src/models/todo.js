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
        }
    },
    {
        timeStamp: true,
    }
);

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;