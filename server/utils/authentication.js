const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server-express");
require("dotenv").config();

const secret = process.env.JWT_SECRET;
const expiration = "2h"; // 2 HOUR SESSION

module.exports = {
  // AUTHENTICATION MIDDLEWARE TO VERIFY TOKEN FOR ADMIN
  authMiddleware: function ({ req }) {
    // ["Bearer", "<tokenvalue>"]
    let token = req.headers.authorization?.split(" ").pop().trim();

    if (!token) {
      return req;
    }

    // VERIFY TOKEN AND ADD DATA TO THE REQUEST
    try {
      const { authenticatedAdmin } = jwt.verify(token, secret, {
        maxAge: expiration,
      });

      req.admin = authenticatedAdmin;

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
  signToken: function ({ _id, username, email, permission }) {
    const payload = { _id, username, email, permission };

    return jwt.sign({ authenticatedAdmin: payload }, secret, {
      expiresIn: expiration,
    });
  },
};
