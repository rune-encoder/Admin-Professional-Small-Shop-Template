const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server-express");
require("dotenv").config();

const secret = process.env.JWT_SECRET;
const expiration = "1h"; // 1 HOUR SESSION

module.exports = {
  // AUTHENTICATION MIDDLEWARE TO VERIFY TOKEN
  authMiddleware: function ({ req }) {
    // ["Bearer", "<tokenvalue>"]
    let token = req.headers.authorization?.split(" ").pop().trim();

    if (!token) {
      return req;
    }

    try {
      const { authenticatedAdmin } = jwt.verify(token, secret, {
        maxAge: expiration,
      });
      req.user = authenticatedAdmin;
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        // !Revisit: Refresh token or prompt the user to log in again.
        throw new AuthenticationError("Session expired. Please log in again.");
      } else {
        throw new AuthenticationError("Invalid token");
      }
    }

    return req;
  },

  // FUNCTION TO CREATE TOKEN WHEN USER LOGS IN
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ authenticatedAdmin: payload }, secret, {
      expiresIn: expiration,
    });
  },
};
