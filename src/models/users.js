import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcryptjs'

const saltRounds = 10;

const userSchema = mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            validate(value) {
                if(!validator.isLength(value, {min:3, max: 50})){
                    throw new Error ('Must be at least 3 characters');
                }
                // if(!validator.isAlpha(value)){
                //     throw new Error ('Should not contain numbers');
                // }
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
        },
        createdAt: {
            type: Date,
            default: Date.now
        }  
    }
);

userSchema.pre('save', function(next) {
    const user = this;

    // only hash the password if it has been modified (or is new)
    if(!user.isModified('password')) return next();

    //generate a Salt
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.password, salt)
    user.password = hash;
    next();
})

userSchema.methods.comparePassword = function(candidatePassword,cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
        if(err) return cb(err);
        cb(null, isMatch);
    });
};

const User = mongoose.model("User", userSchema);

export default User;