import { gql } from "@apollo/client"
import { initializeApollo } from "../apollo/client"

const client = initializeApollo()

const UPLOAD_FILE_QUERY = gql`
  mutation UploadFile($file: Upload!) {
    uploadFile(file: $file) {
      url
      name
    }
  }
`

export const uploadFileRequest = async (file) => {
  let res = await client.query({
    query: UPLOAD_FILE_QUERY,
    variables: { file },
    fetchPolicy: "no-cache",
  })
  let uploadedFile = res.data.uploadFile
  //console.log(uploadedFile)
  return uploadedFile
}
