const jwt = require("jsonwebtoken");
const asynHandler = require("express-async-handler");
const validateToken = asynHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.authorization || req.headers.Authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.sendStatus(401);
        throw new Error("User not authorized");
      }console.log(decoded)
      req.user = decoded.user;
      next();
    });
  }
  if(!token){
    res.status(401).send("Token is not provided")
  }
});
module.exports = validateToken;
