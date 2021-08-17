import { gql } from "@apollo/client"
import { initializeApollo } from "../apollo/client"

const client = initializeApollo()

const PORTFOLIOS_QUERY = gql`
  query getPortfoliosList(
    $perPage: Int
    $page: Int
    $order: String
    $direction: String
    $filter: filterType
  ) {
    total: totalPortfolios(filter: $filter)
    data: getPortfolios(
      perPage: $perPage
      page: $page
      order: $order
      direction: $direction
      filter: $filter
    ) {
      id
      name
      img
      url
      createdTs
      order_number
      tags {
        id
        name
      }
    }
  }
`

const CREATE_PORTFOLIO_QUERY = gql`
  mutation CreatePortfolioHandler(
    $name: String
    $url: String
    $tags: [tagInput]
    $order_number: String
    $uploadedFile: String
  ) {
    createPortfolio(
      name: $name
      uploadedFile: $uploadedFile
      url: $url
      tags: $tags
      order_number: $order_number
    ) {
      error
      success
    }
  }
`
const DELETE_PORTFOLIO_QUERY = gql`
  mutation DeletePortfolio($id: ID!) {
    deletePortfolio(id: $id) {
      error
      success
    }
  }
`
const EDIT_PORTFOLIO_QUERY = gql`
  mutation EditPortfolio(
    $id: ID!
    $name: String
    $url: String
    $tags: [tagInput]
    $order_number: Int
    $uploadedFile: String
  ) {
    editPortfolio(
      id: $id
      name: $name
      uploadedFile: $uploadedFile
      url: $url
      tags: $tags
      order_number: $order_number
    ) {
      error
      success
    }
  }
`
export const getList = async (
  page = 1,
  perPage = 5,
  direction = "desc",
  order = "id",
  filter = {}
) => {
  let { data } = await client.query({
    query: PORTFOLIOS_QUERY,
    variables: { perPage, page, direction, order, filter },
    fetchPolicy: "no-cache",
  })

  let res = {
    ...data,
    perPage,
    page,
  }

  return res
}

export const createPortfolio = async (values) => {
  let res = await client.query({
    query: CREATE_PORTFOLIO_QUERY,
    variables: { ...values },
    fetchPolicy: "no-cache",
  })

  return res
}

export const deletePortfolioRequest = async (id) => {
  let res = await client.query({
    query: DELETE_PORTFOLIO_QUERY,
    variables: { id },
    fetchPolicy: "no-cache",
  })

  return res
}

export const editPortfolioRequest = async (values) => {
  let res = await client.query({
    query: EDIT_PORTFOLIO_QUERY,
    variables: values,
    fetchPolicy: "no-cache",
  })

  return res
}
