const mongoose = require('mongoose');
//define a schema for the contact form data
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    date: { type: Date, default: Date.now }
}); //create a model include name, email, message, and date

//create a model based on the schema
const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;