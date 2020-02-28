/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../api/config/secrets");

function authenticate(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, jwtSecret, (error, decodedToken) => {
      if (error) {
        res.status(401).json({ error: "wrong token" });
      } else {
        req.user = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ error: "wrong token" });
  }
}

module.exports = authenticate;

// module.exports = (req, res, next) => {
//   res.status(401).json({ you: "shall not pass!" });
// };
