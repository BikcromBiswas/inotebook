require('dotenv').config()
const jwt = require('jsonwebtoken')
const fetchUser = (req, res, newnext) => {
    const token = req.header('auth-token');
    if (!token) {
        req.status(401).send({ error: "Please authenticate using a valid token" })
    }
    const secret = process.env.SECRET_KEY;
    try {
        const decoded = jwt.verify(token, secret)
        console.log(decoded)
        req.id = decoded.id;
        newnext();
    }
    catch (error) {
        return res.status(401).json({ error: 'Token verification failed' })
    }

}
module.exports = fetchUser