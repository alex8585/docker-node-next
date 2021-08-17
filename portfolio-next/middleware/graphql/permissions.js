import { shield, rule, and, or } from "graphql-shield"

const isAuthenticated = rule({ cache: "contextual" })(
  async (parent, args, ctx, info) => {
    if (ctx.user.id) {
      return true
    }
    return false
  }
)

const isAdmin = rule({ cache: "contextual" })(
  async (parent, args, ctx, info) => {
    if (ctx.user.isAdmin) {
      return true
    }
    return false
  }
)

const permissions = shield({
  Query: {
    getTags: and(isAuthenticated, isAdmin),
  },
})

export default permissions
