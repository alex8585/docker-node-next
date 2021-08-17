import { createWriteStream, unlink } from "fs"
import shortId from "shortid"
import path from "path"
import { fileURLToPath } from "url"
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * Stores a GraphQL file upload in the filesystem.
 * @param {Promise<object>} upload GraphQL file upload.
 * @returns {Promise<string>} Resolves the stored file name.
 */

export const serverPath = (fileName = "") => {
  return path.join(__dirname, "../", fileName)
}
//console.log(serverPath())
export const getTmpUploadsPath = (fileName = "") => {
  return serverPath("/public/uploads/tmp/" + fileName)
}

export const getUploadsPath = (fileName = "") => {
  return serverPath("/public/uploads/" + fileName)
}

export const getTmpImgUrl = (fileName = "") => {
  return "/uploads/tmp/" + fileName
}

export const getImgUrl = (fileName = "") => {
  return "/uploads/" + fileName
}

export const pathByUrl = (url) => {
  return serverPath(path.join("/public/", url))
}

export const storeUpload = async (upload) => {
  const { createReadStream, filename } = await upload
  const stream = createReadStream()
  const storedFileName = `${shortId.generate()}-${filename}`

  const storedPath = getTmpUploadsPath(storedFileName)
  const storedUrl = getTmpImgUrl(storedFileName)
  //console.log(serverPath("/public/uploads/tmp/" + storedFileName))

  // Store the file in the filesystem.
  await new Promise((resolve, reject) => {
    // Create a stream to which the upload will be written.
    const writeStream = createWriteStream(storedPath)

    // When the upload is fully written, resolve the promise.
    writeStream.on("finish", resolve)

    // If there's an error writing the file, remove the partially written file
    // and reject the promise.
    writeStream.on("error", (error) => {
      unlink(storedPath, () => {
        reject(error)
      })
    })

    // In Node.js <= v13, errors are not automatically propagated between piped
    // streams. If there is an error receiving the upload, destroy the write
    // stream with the corresponding error.
    stream.on("error", (error) => writeStream.destroy(error))

    // Pipe the upload into the write stream.
    stream.pipe(writeStream)
  })

  return [storedPath, storedUrl, storedFileName]
}
