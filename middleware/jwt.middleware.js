const { expressjwt: jwt } = require("express-jwt");

// Instantiate the JWT token validation middleware
const isAuthenticated = jwt({
  secret: process.env.TOKEN_SECRET,
  algorithms: ["HS256"],
  requestProperty: "payload",
  getToken: getTokenFromHeaders,
});

// Function used to extract the JWT token from the request's 'Authorization' Headers
function getTokenFromHeaders(req) {
  // Check if the token is available on the request Headers
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    // Get the encoded token string and return it
    const token = req.headers.authorization.split(" ")[1];
    return token;
  }

  return null;
}

const isAdmin = (req, res, next) => {
const token = req.headers.authorization.split(" ")[1];

  const payload = jwt.verify(token, process.env.TOKEN_SECRET);

  req.payload = payload;
  if (req.payload.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "You are not authorized to access this resource" });
  }
};

// Export the middleware so that we can use it to create protected routes
module.exports = {
  isAuthenticated,
  isAdmin
};
