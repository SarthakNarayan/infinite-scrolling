const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const fs = require("fs");

// graphql imports
const resolvers = require("./graphql/resolver2.js");
const typeDefs = gql(
  fs.readFileSync("./graphql/schema2.gql", {
    encoding: "utf-8",
  })
);

const app = express();
const PORT = process.env.PORT || 5000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.applyMiddleware({ app, path: "/graphql" });

app.listen({ port: PORT }, () =>
  console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`)
);
