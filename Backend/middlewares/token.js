const jwt = require('jsonwebtoken');
const User_Model = require('../model/User.model');
const JWT_Secrete = process.env.JWT_SECRET;
const JWT_Expired = process.env.JWT_EXPIRATION || "5200";
const JWT_Algorithm = process.env.JWT_ALGORITHM || "HS256";

module.exports = async (req, res, next) => {
    const data = req.body;

    if (!data) return res.status(404).send({ message: "Please fillup credentials" });

    const UserData = await User_Model.findOne({ email: data.email });
    const token = jwt.sign({ UserData }, JWT_Secrete, {
        algorithm: JWT_Algorithm,
        expiresIn: Number(JWT_Expired),
    });

    const JWT = {
        algorithm: JWT_Algorithm,
        expiresIn: `${(JWT_Expired / 3600).toFixed(2)} in hours`
    }
    res.status(200).send({ token, JWT })
    next();
}

