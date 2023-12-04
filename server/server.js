// Import Express.js and Apollo Server
const express = require("express");
const { ApolloServer } = require("apollo-server-express");

// Import Schema and Resolvers from the schema folder
const { typeDefs, resolvers } = require("./schemas");

// Import middleware function for authentication.
const { authMiddleware } = require("./utils/auth");

// Database connection and "path" to serve up static assets
const db = require("./config/connection");
const path = require("path");

// Create a new instance of an Apollo server with the GraphQL schema
const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

// Start the Apollo server
const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json({ limit: "5mb" }));

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
