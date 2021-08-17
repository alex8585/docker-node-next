import mongoose from "mongoose"
import { createRequire } from "module"
const require = createRequire(import.meta.url)
require("dotenv").config()
const DATABASE_URI =
  process.env.DATABASE_URI ||
  "mongodb+srv://alex85:Elvne3132@cluster0.5ymss.mongodb.net/portfolio?retryWrites=true&w=majority"

if (!DATABASE_URI) {
  throw new Error(
    "Please define the DATABASE_URI environment variable inside .env.local"
  )
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      "auth": {"authSource": "admin"  },
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
      bufferMaxEntries: 0,
      useFindAndModify: false,
      useCreateIndex: true,
      serverSelectionTimeoutMS: 5000,
    }

    cached.promise = mongoose.connect(DATABASE_URI, opts).then((mongoose) => {
      return mongoose
    })
  }
  cached.conn = await cached.promise
  return cached.conn
}

export default dbConnect
