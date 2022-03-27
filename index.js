const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const { merge } = require("lodash");

const typeDefs = require("./graphql/typeDefs");

const daoWalletResolvers = require("./graphql/resolvers/daoWallet");
const daoPostResolvers = require("./graphql/resolvers/daoPost");
const daoResolvers = require("./graphql/resolvers/dao");

const { MONGODB } = require("./config.js");

const PORT = process.env.PORT || 80;
const HOST = "0.0.0.0";

const server = new ApolloServer({
  typeDefs,
  resolvers: merge(
    daoWalletResolvers,
    daoPostResolvers,
    daoResolvers
  ),
  context: ({ req }) => {
    // console.log(req.headers.authorization);
    // const token = req.headers.authorization || "";
    return {
      req: req,
    };
  },
  cors: {
    credentials: true,
    origin: "*",
  },
});

const GetAccessToken = function (request) {
  const token = request.headers.authorization || "";
  return token;
};

mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to MongoDB");
    mongoose.set("debug", true);
    return server.listen({ port: PORT, host: HOST });
  })
  .then((res) => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
  })
  .catch((err) => {
    console.log(err);
  });
