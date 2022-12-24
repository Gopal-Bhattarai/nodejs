import mongoose from "mongoose";
import validator from "validator";

const userSchema = mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            validate(value) {
                if(!validator.isLength(value, {min:3, max: 50})){
                    throw new Error ('Must be at least 3 characters');
                }
                if(!validator.isAlpha(value)){
                    throw new Error ('Should not contain numbers');
                }
            }
        },
        email: {
            type: String,
            required: true, 
            unique: true, 
            lowercase: true, 
            validate(value){
                if(!validator.isEmail(value)) {
                    throw new Error('Invalid email address!');
                  } 
            }
        },
        password: {
            type: String,
            required: true,
            validate(value) {
                if(!validator.isStrongPassword(value, {minLength:6, minLowercase: 1, minUppercase:1, minNumbers: 1, minSymbols: 0})){
                    throw new Error ('Password: mimimum 6 chars, AtLeast: 1 Small, 1 Capital & 1 number');
                }
            }
        }
    },
    {
        timeStamps: true,
    }
);

const User = mongoose.model("User", userSchema);

export default User;