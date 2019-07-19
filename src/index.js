import express from "express";
import { ApolloServer} from "apollo-server-express";
import typeDefs from "./gql_typedefs.js";
import resolvers from "./gql_resolvers.js";
import { loadFixtures } from "./utils";

global.fakeDatabase = loadFixtures();

const app = express();

const server = new ApolloServer({
  cors: true,
  typeDefs,
  resolvers,
  context: {
    currentUser: fakeDatabase.users[1]
  }
});

server.applyMiddleware({ app, path: "/graphql" });

app.listen({ port: 5000 }, () => {
  console.log("Forum prototype on http://localhost:5000/graphql");
});
