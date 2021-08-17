import { gql } from "@apollo/client"
import { initializeApollo } from "../apollo/client"

const client = initializeApollo()

const LOGIN_QUERY = gql`
  query AttemptLogin($email: String, $password: String) {
    login(email: $email, password: $password) {
      id
      username
      email
      isAdmin
      token
      error
    }
  }
`
export const login = async (email, password) => {
  let data = await client.query({
    query: LOGIN_QUERY,
    variables: { email, password },
    fetchPolicy: "no-cache",
  })
  return data
}
