import jwt from "jsonwebtoken"
import User from "../../models/userModel.js"
const setUser = async (resolve, root, args, ctx, info) => {
  let token = ctx.token

  if (token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    if (decoded && decoded.id) {
      let user = null
      try {
        user = await User.findById(decoded.id).select("-password")
      } catch (e) {
        console.log(e)
      }

      if (user && user.id) {
        ctx.user = user
      }
    }
  }

  const result = await resolve(root, args, ctx, info)
  return result
}

export default setUser
