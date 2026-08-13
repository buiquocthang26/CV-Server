// Connect once, when the page loads. This one connection lives for the whole session.
const socket = io('http://localhost:3000');

const messagesEl = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');

// Turn a saved message document into a bubble and append it.
function buildBubble(msg) {
    const row = document.createElement('div');
    // socket.id is unique per connection, so compare against our own current id
    // to decide if this bubble is "mine" or "theirs"
    row.className = `bubble-row ${msg.senderID === socket.id ? 'mine' : 'theirs'}`;

    const wrap = document.createElement('div');

    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.textContent = msg.text;

    const time = document.createElement('div');
    time.className = 'bubble-time';
    time.textContent = new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    wrap.appendChild(bubble);
    wrap.appendChild(time);
    row.appendChild(wrap);
    return row;
}

// Emit sendMessage when the button is clicked or Enter is pressed.
// No DOM update happens here -- we wait for the server to broadcast it back.
function sendMessage() {
    const text = messageInput.value.trim();
    if (!text) return;

    socket.emit('sendMessage', { text });
    messageInput.value = '';
}

sendBtn.addEventListener('click', sendMessage);
messageInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendMessage();
});

// Fires once, right after connecting -- renders everything that already
// existed in the database before this page ever loaded.
socket.on('chatHistory', (history) => {
    history.forEach(msg => {
        messagesEl.appendChild(buildBubble(msg));
    });
    messagesEl.scrollTop = messagesEl.scrollHeight;
});

// The only place a *new* bubble ever gets drawn -- whether it's our own
// message coming back, or someone else's, live.
socket.on('receiveMessage', (msg) => {
    messagesEl.appendChild(buildBubble(msg));
    messagesEl.scrollTop = messagesEl.scrollHeight;
});

socket.on('messageError', (errMsg) => {
    alert(errMsg); // simple for now -- can swap for an inline UI element later
});