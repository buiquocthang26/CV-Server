const User = require('../models/login');
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const jwt = require('jsonwebtoken'); // Import jsonwebtoken for token generation

const submitLogin = async (req, res) => {
    try{
        const { email, password } = req.body;

        //find user with matching email
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({error: 'User not found'});
        }

        const match = await bcrypt.compare(password, user.password);
        if(!match){
            return res.status(401).json({error: 'Invalid password'});
        }
        
        const token = jwt.sign(
            { email: user.email, id: user._id },    //content of the token
            process.env.JWT_SECRET,                 //key assign to token
            { expiresIn: '3h' });                   //expire date

        res.status(200).json({ message: 'Login successful', token });
    }
    catch (error) {
        console.error('Error submitting login form:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = submitLogin;