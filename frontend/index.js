// Global Chat navigation
const openChatBtn = document.getElementById('openChatBtn');
if (openChatBtn) {
    openChatBtn.addEventListener('click', () => {
        window.location.href = 'chatBox.html';
    });
}

const loginModal = document.getElementById('loginModal');
const openLoginBtn = document.getElementById('openLoginBtn');
const closeLoginBtn = document.getElementById('closeLoginBtn');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const tabLogin = document.getElementById('tabLogin');
const tabRegister = document.getElementById('tabRegister');

    // Open / close modal
    openLoginBtn.addEventListener('click', () => {
        loginModal.style.display = 'flex';
    });
    closeLoginBtn.addEventListener('click', () => {
        loginModal.style.display = 'none';
    });

    // Tab switching
    tabRegister.addEventListener('click', () => {
        tabRegister.classList.add('active');
        tabLogin.classList.remove('active');
        registerForm.style.display = 'block';
        loginForm.style.display = 'none';
    });
    tabLogin.addEventListener('click', () => {
        tabLogin.classList.add('active');
        tabRegister.classList.remove('active');
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    });

    // Register submit
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        fetch('http://localhost:3000/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: document.getElementById('registerUsername').value,
                email: document.getElementById('registerEmail').value,
                password: document.getElementById('registerPassword').value
            })
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => { throw new Error(err.error); });
            }
            return response.json();
        })
        .then(data => {
            alert('Account created! You can now log in.');
            registerForm.reset();
            // Switch to login tab
            tabLogin.click();
        })
        .catch(error => {
            alert(error.message || 'Registration failed. Please try again.');
            console.error('Error:', error);
        });
    });

    // Login submit
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: document.getElementById('loginEmail').value,
                password: document.getElementById('loginPassword').value
            })
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => { throw new Error(err.error); });
            }
            return response.json();
        })
        .then(data => {
            localStorage.setItem('token', data.token); // Store the JWT token in localStorage
            alert('Login successful!');
            loginForm.reset();
            loginModal.style.display = 'none';
        })
        .catch(error => {
            alert(error.message || 'Login failed. Please try again.');
            console.error('Error:', error);
        });
    });

const modal = document.getElementById('contactModal');
const openBtn = document.getElementById('openContactBtn');
const closeBtn = document.getElementById('closeContactBtn');
const form = document.getElementById('contactForm');

    // Open Modal when button is clicked
    openBtn.addEventListener('click', () => {
        modal.style.display = 'flex';
    });

    // Close Modal when 'X' is clicked
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close Modal if user clicks outside of the main modal content container
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Form submission intercept logic
    form.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: document.getElementById('callerName').value,
            email: document.getElementById('callerEmail').value,
            message: document.getElementById('callerMessage').value
        })
    })
    .then(response => response.json())
    .then(data => {
        alert('Message sent!');
        form.reset();
        modal.style.display = 'none';
    })
    .catch(error => {
        alert('Failed to send message. Please try again.');
        console.error('Error:', error);
    });
});