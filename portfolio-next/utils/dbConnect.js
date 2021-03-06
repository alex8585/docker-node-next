import mongoose from "mongoose"

const DATABASE_URI = process.env.DATABASE_URI

if (!DATABASE_URI) {
  // throw new Error(
  //   'Please define the DATABASE_URI environment variable inside .env.local'
  // )
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
      auth: { authSource: "admin" },
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
