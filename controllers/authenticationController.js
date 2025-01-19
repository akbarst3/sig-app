const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

/**
 * @desc    Render login page
 * @route   GET /login
 * @access  Public
 */const index = (req, res) => {
    res.render("login");
}

/**
 * @desc    Login admin
 * @route   POST /login
 * @access  Public
 */
const create = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400);
        throw new Error("Please fill in all fields");
    }
    const user = await User.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            username: user.username,
            name: user.name
        }, process.env.ACCESS_TOKEN, { expiresIn: '30s' });
        const refreshToken = jwt.sign({
            username: user.username,
            name: user.name
        }, process.env.REFRESH_TOKEN, { expiresIn: '1d' });
        await user.updateOne({ refreshToken: refreshToken });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true, maxAge: 24 * 60 * 60 * 1000
        });
        res.status(200).json({ accessToken });
    } else {
        res.status(401);
        throw new Error("Invalid username or password");
    }
});

/**
 * @desc    logout
 * @route   POST /logout
 * @access  Private
 */
const logout = asyncHandler(async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(200).json({ message: 'No refresh token found. User is already logged out.' });
    }

    await User.findOneAndUpdate(
        { refreshToken },
        { $set: { refreshToken: null } },
        { new: true }
    );

    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        domain: 'localhost'
    });
    return res.status(200).json({ message: 'Logged out successfully' });
});

module.exports = { index, create, logout }