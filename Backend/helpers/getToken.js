const jwt = require('jsonwebtoken');
const JWT_Secrete = process.env.JWT_SECRET;
const JWT_Expired = process.env.JWT_EXPIRATION || "5200";
const JWT_Algorithm = process.env.JWT_ALGORITHM || "HS256";


async function getToken(UserData) {
    const token = jwt.sign({ UserData }, JWT_Secrete, {
        algorithm: JWT_Algorithm,
        expiresIn: Number(JWT_Expired),
    });

    const JWT = {
        algorithm: JWT_Algorithm,
        expiresIn: `${(JWT_Expired / 3600).toFixed(2)} in hours`
    }
    return {token, JWT}
}

module.exports = getToken;
