const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }

    try {
        const parts = authorization.split(" ");
        const token = parts[1];

        const decoded = jwt.verify(token, secret);
        req.userId = decoded.userId;
        next();
    } catch (err) {
        console.error(err);
        return res.status(401).json({
            message: "Unauthorized",
        });
    }

}

module.exports = authMiddleware;