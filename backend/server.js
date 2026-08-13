//set up the server
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require('http');
const { Server } = require('socket.io');
const chatsocket = require('./sockets/chatSocket');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

//setup mongodb connection
mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

const contactRoutes = require('./routes/contact');
app.use('/api', contactRoutes);
const loginRoutes = require('./routes/login');
app.use('/api', loginRoutes);
const registerRoutes = require('./routes/register');
app.use('/api', registerRoutes);

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*', // Allow requests from any origin
        methods: ['GET', 'POST'], // Allow only GET and POST methods
    },
});

//attach the chat socket to the server
chatsocket(io);

//start the server and listen on online server port
server.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`);
});