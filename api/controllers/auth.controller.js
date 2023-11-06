import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'; 

export const signup = async (req, res) => {
    const { username, email, password } = req.body; 
    const hashedPassword = bcryptjs.hashSync(password, 10); //encrypting the password
    const newUser = new User({ username, email, password: hashedPassword }); //creating a new user in the database according to details entered
    try {
        await newUser.save(); //wait till user is saved in the database
        res.status(201).json("User created successfully!!"); 
    } catch (error) {
        res.status(500).json(error.message); 
    }
}; 