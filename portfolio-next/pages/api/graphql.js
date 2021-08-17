import { ApolloServer } from "apollo-server-micro"
import { applyMiddleware } from "graphql-middleware"
import { typeDefs } from "../../apollo/type-defs"
import { resolvers } from "../../apollo/resolvers"

import setUser from "../../middleware/graphql/setUser"
import permissions from "../../middleware/graphql/permissions"
import { processRequest } from "graphql-upload"

export const config = {
  api: {
    bodyParser: false,
  },
}

console.log("1")
//const schemaWithMiddleware = applyMiddleware(schema, setUser)

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: false,
  uploads: false,
  formatError: (err) => {
    console.log(err)
    return err
  },
  context: ({ req }) => {
    let token = req.headers.authorization || ""
    if (token) {
      token = req.headers.authorization.split(" ")[1]
    }
    return { token }
  },
})

console.log("2")
await apolloServer.start()

let apolloHandler = await apolloServer.createHandler({ path: "/api/graphql" })
console.log("3")
//expressApp.use(bodyParser.urlencoded({ extended: false }))
//expressApp.use()
//expressApp.use(fileupload())
//expressApp.use(mongoose())
//expressApp.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }))
//expressApp.use(apolloHandler)

// export default async (req, res) => {
//   const contentType = req.headers["content-type"]
//   if (contentType && contentType.startsWith("multipart/form-data")) {
//     req.filePayload = await processRequest(req, res)
//   }
//   console.log("4")
//   return apolloHandler(req, res)
// }
export default apolloHandler
