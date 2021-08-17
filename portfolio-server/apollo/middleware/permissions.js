import { shield, rule, and } from "graphql-shield"

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
  Mutation: {
    createTag: and(isAuthenticated, isAdmin),
    deleteTag: and(isAuthenticated, isAdmin),
    editTag: and(isAuthenticated, isAdmin),
    createPortfolio: and(isAuthenticated, isAdmin),
    editPortfolio: and(isAuthenticated, isAdmin),
    deletePortfolio: and(isAuthenticated, isAdmin),
    uploadFile: and(isAuthenticated, isAdmin),
  },
})

export default permissions
