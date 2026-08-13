const validateContact = (req, res, next) => {
    const { name, email, message } = req.body;

    // Check empty fields
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Check email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    // Check message length
    if (message.trim().length < 10) {
        return res.status(400).json({ error: 'Message too short (min 10 characters)' });
    }

    next(); // all good, pass to controller
};
const validateLogin = (req, res, next) => { //can be use for both login and register validation
    const { email, password } = req.body;

    // Check empty fields
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    // Check email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    // Check password length
    if (password.length < 6) {
        return res.status(400).json({ error: 'Password too short (min 6 characters)' });
    }

    next(); // all good, pass to controller
};

module.exports = {
    validateContact,
    validateLogin
};