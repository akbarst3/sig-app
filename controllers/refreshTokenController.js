const User = require('../models/user');
const jwt = require('jsonwebtoken');

const refreshToken = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.sendStatus(401)
    }

    const user = await User.findOne({ refreshToken });
    if (!user) {
        return res.sendStatus(403)
    }

    if (user.refreshToken !== refreshToken) {
        return res.sendStatus(403)
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) => {
        if (err) {
            return res.sendStatus(403)
        }

        const accessToken = jwt.sign({ username: user.username, name: user.name }, process.env.ACCESS_TOKEN, { expiresIn: '30s' });

        res.json({ accessToken });
    });
}

module.exports = { refreshToken }