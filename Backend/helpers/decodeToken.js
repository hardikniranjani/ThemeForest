const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = process.env.JWT_SECRET;
const User_Model = require('../model/User.model')


async function decodeToken(data) {
    try {
        var token = data;
        if (!token) return Token = { Message: "Token is required" }

        const decodedToken = jwt.verify(token.data, JWT_SECRET_KEY);
        const userId = decodedToken.UserData._id;
        const User = await User_Model.findOne({ _id: userId })

        if (!User) return Token = { Message: "Token Expire" };

        const Token = {
            user: User
        }
        return Token;
    } catch {
        const Token = {
            Message: "Invalid Token",
        }
        return Token;
    }
}

module.exports = decodeToken;