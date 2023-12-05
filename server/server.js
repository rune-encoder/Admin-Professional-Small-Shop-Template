// IMPORT EXPRESS.JS AND APOLLO SERVER
const express = require("express");
const { ApolloServer } = require("apollo-server-express");

// IMPORT TYPEDEFS AND RESOLVERS
const { typeDefs, resolvers } = require("./schemas");

// IMPORT MIDDLEWARE FUNCTION FOR AUTHENTICATION
const { authMiddleware, verifyToken } = require("./utils/authentication");

// DATABASE CONNECTION AND "PATH" TO SERVE UP STATIC ASSETS
const db = require("./config/connection");
const path = require("path");

// CREATE A NEW INSTANCE OF APOLLO SERVER AND PASS IN THE SCHEMA DATA
const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

// START APOLLO SERVER
const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: false }));
  // !Revisit: May need to increase or decrease the limit.
  app.use(express.json({ limit: "5mb" }));

  // Tell Apollo server to use the Express application as middleware.
  server.applyMiddleware({ app });

  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));

    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/dist/index.html"));
    });
  }

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

startApolloServer();
