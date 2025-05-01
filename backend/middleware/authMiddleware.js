const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {

    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ menubarge: "Authorization token required" });
    }

    const token = authorization.split(" ")[1];

    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(id).select("_id username email");
        req.userId = id;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ menubarge: "Request is not authorized" });
    }
}

module.exports = authMiddleware;