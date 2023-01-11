const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = process.env.JWT_SECRET;
const User_Model = require('../model/User.model')
module.exports = async (req, res, next) => {

    var token = req.headers.authorization;

    if (!token) return res.status(400).send({ Message: "Token is required" });

    try {
        const decodedToken = jwt.verify(token, JWT_SECRET_KEY);
        const userId = decodedToken.UserData._id;
        const User = await User_Model.findOne({ _id: userId })
        
        if (!User) {
            return res.status(404).send({ Message: "Invalid Token" });
        } else {
            next();
        }
    } catch (err) {
        res.status(403).send({
            success: false,
            message: err.name
        })
    }

}