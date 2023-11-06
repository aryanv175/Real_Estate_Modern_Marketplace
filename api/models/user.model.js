import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: true, //username is required to be entered
        unique: true, //Same user names are not allowed
    }, 
    email: {
        type: String, 
        required: true, 
        unique: true 
    }, 
    password: {
        type: String, 
        required: true
    }
}, { timestamps: true }); //Records time of creation and time of update of user. 

const User = mongoose.model('User', userSchema); 

export default User; 