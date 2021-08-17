const setToken = async (resolve, root, args, ctx, info) => {
  let token = ctx.headers.authorization || ""
  if (token) {
    token = ctx.headers.authorization.split(" ")[1]
    ctx.token = token
  }

  const result = await resolve(root, args, ctx, info)
  return result
}

export default setToken
