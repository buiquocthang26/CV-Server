// backend/sockets/chatSocket.js
const Message = require('../models/message'); //import the Message model

function chatsocket(io) {
    io.on('connection', async (socket) => {   //when user connects to the socket
        console.log('A user connected to the chat socket');
        //auto move user to global chat room
        socket.join('global');

        // Load existing history for this room and send it to just this one socket
        try {
            const history = await Message.find({ room: 'global' }).sort({ timestamp: 1 });
            socket.emit('chatHistory', history);
        } catch (err) {
            console.error('Failed to load chat history:', err);
        }

        socket.on('sendMessage', async (data) => { //server catch the message from user and broadcast it to all users in the global room
            try {
                const messageDocument = await Message.create({
                    room: 'global',
                    text: data.text,
                    senderID: socket.id,
                    timestamp: new Date()
                }); //save the message to the database

                io.to('global').emit('receiveMessage', messageDocument); //broadcast message to all users in the global room

            } catch (err) {
                console.error('Error saving message to the database:', err);
                socket.emit('error', 'Failed to save message to the database'); //send error message to the user
            }
        });

        socket.on('disconnect', () => {
            console.log('A user disconnected from the chat socket');
        });
    });
}

module.exports = chatsocket;