const jwt = require("jsonwebtoken");

function noTokenResponse(res, errorCode = 401) {
  return res.status(errorCode).json("Not authorized, please log in first");
}

function isAuth(req, res, next) {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return noTokenResponse(res);
  }
  const splits = authorization.split(" ");
  if (splits.length != 2 || splits[0] != "Bearer") {
    return noTokenResponse(res, 400);
  }
  const jwtString = splits[1];
  try {
    var token = jwt.verify(jwtString, req.app.get("secretKey"));
    const authority = {
      id: token.id,
      name: token.name,
    };
    req.authority = authority;
    //si todo ha ido bien pasamos el middleware
    next();
  } catch (err) {
    return next(err);
  }
}
module.exports = { isAuth };
