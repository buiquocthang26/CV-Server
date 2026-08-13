const mongoose = require('mongoose');
//define a schema for the login form data
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
}); //create a model include username, email and password

//create a model based on the schema
const User = mongoose.model('User', userSchema);   

module.exports = User;