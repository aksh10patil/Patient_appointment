const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./config");

const authmiddleware = (req, res, next) => {
    const authHeaders = req.headers.authorization;
    if(!authHeaders || !authHeaders.startsWith('Bearer')){
        res.json({
            message: "token is not present"
        })
    }
    const token = authHeaders.split('')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    if(decoded.user._Id){
        req.user._Id = decoded.user._Id 
    }
    next();
}

module.exports = {
    authmiddleware
}