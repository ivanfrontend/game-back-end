const http = require("http");
const apollo = require("apollo-server-express");
const express = require("express");
const mongoose = require("mongoose");
const resolvers = require("./gql/resolvers");
const typeDefs = require("./gql/typeDefs");
// import http from 'http';

//create a server object:

mongoose.connect(
  "mongodb+srv://admin:12345678Qwer@cluster0.smikh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "DB connection error:"));
db.once("open", () => {
  console.log("DB connected");
}); // close db.once callback

const ApolloServer = apollo.ApolloServer;
async function startApolloServer() {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res, ...rest }) => {
      //   console.log("rest rest rest ", rest);
      // console.log("q2 q2 q2 ", req);
      // console.log("q3 q3 q3 ", res);
    }
  });
  await server.start();
  server.applyMiddleware({ app, path: "/", cors: { credentials: true } });
  await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer();
