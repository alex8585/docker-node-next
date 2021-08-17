import jwt from "jsonwebtoken"

export const generateToken = (id) => {
  let jwts = process.env.JWT_SECRET || "sdf4we5pjlksdfgndklf"
  return jwt.sign({ id }, jwts, {
    expiresIn: "30d",
  })
}

export const calcPages = (pageSize, totalCount) => {
  return totalCount < pageSize ? 1 : Math.ceil(totalCount / pageSize)
}

export const getUserFromLocalStorage = () => {
  const user = localStorage.getItem("user")
  if (!user) {
    return null
  }

  return JSON.parse(user)
}

export const getUserTokenFromLocalStorage = () => {
  let user = getUserFromLocalStorage()
  if (!user || !user.token) {
    return null
  }
  return user.token
}

export const deleteUserFromLocalStorage = () => {
  localStorage.removeItem("user")
}
