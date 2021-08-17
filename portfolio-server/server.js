import { resolvers } from "./apollo/resolvers.js"
import { typeDefs } from "./apollo/type-defs.js"
import { ApolloServer } from "apollo-server-express"
import dbConnect from "./utils/dbConnect.js"
import https from "https"
import express from "express"
import { applyMiddleware } from "graphql-middleware"
import permissions from "./apollo/middleware/permissions.js"

import setToken from "./apollo/middleware/setToken.js"
import setUser from "./apollo/middleware/setUser.js"
import { makeExecutableSchema } from "@graphql-tools/schema"
await dbConnect()
import fs from "fs"
import cors from "cors"
import { graphqlUploadExpress } from "graphql-upload"

async function startApolloServer() {
  const config = {
    port: process.env.SERVER_PORT || 4000,
    host: process.env.SERVER_HOST || "",
  }

  let options = {
    key: fs.readFileSync(`./ssl/localhost-privateKey.key`),
    cert: fs.readFileSync(`./ssl/localhost.crt`),
  }

  const schema = makeExecutableSchema({ typeDefs, resolvers })

  const schemaWithMiddleware = applyMiddleware(
    schema,
    setToken,
    setUser,
    permissions
  )

  const appoloServer = new ApolloServer({
    schema: schemaWithMiddleware,
    context: ({ req }) => {
      return { headers: req.headers }
    },
  })
  await appoloServer.start()

  const app = express()
  app.use(cors())

  app.use(graphqlUploadExpress())
  appoloServer.applyMiddleware({ app })

  app.route("/test").get(function (req, res) {
    return res.status(200).json({ test: "1" })
  })

  app.use(express.static("public"))

  await new Promise((resolve) => {
    return https
      .createServer(options, app)
      .listen({ port: config.port, host: config.host }, resolve)
  })

  console.log(
    "🚀 Server ready at",
    `http${config.ssl ? "s" : ""}://${config.host}:${config.port}${
      appoloServer.graphqlPath
    }`
  )

  return { appoloServer, app }
}

startApolloServer()
