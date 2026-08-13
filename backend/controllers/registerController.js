const User = require('../models/login');
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing

const submitRegister = async (req, res) => {
    try{
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.status(400).json({ error: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password with a salt round of 10

        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    }catch (error) {
        console.error('Error submitting registration form:', error);
        res.status(500).json({ error: 'Internal server error' });
    }};

module.exports = submitRegister;