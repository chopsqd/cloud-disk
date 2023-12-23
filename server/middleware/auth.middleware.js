const jwt = require("jsonwebtoken")
const config = require("config")

module.exports = (req, res, next) => {
    if(req.method === "OPTIONS") {
        return next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1]
        if(!token) {
            return res.status(401).json({message: "Unauthorized"})
        }

        req.user = jwt.verify(token, config.get('SECRET_KEY'))

        next()
    } catch(error) {
        return res.status(401).json({message: "Auth error"})
    }
}
