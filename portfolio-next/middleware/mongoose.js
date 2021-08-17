import dbConnect from "../utils/dbConnect"

function mongoose() {
  return async (req, res, next) => {
    await dbConnect()

    next()
  }
}

export default mongoose
