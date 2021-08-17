import { gql } from "apollo-server"

export const typeDefs = gql`
  scalar FileUpload
  type File {
    path: String
    url: String
    name: String
  }

  type Tag {
    id: ID!
    name: String
    createdAt: String
    updatedAt: String
    createdTs: Float
  }

  type Portfolio {
    id: ID!
    name: String
    img: String
    url: String
    updatedAt: String
    createdTs: Float
    tags: [Tag]
    order_number: Int
  }

  type User {
    id: ID
    username: String
    email: String
    isAdmin: Boolean
    token: ID
    error: String
  }

  type ActionResponce {
    error: String
    success: Boolean
  }

  input filterType {
    tags: String
  }

  input tagInput {
    id: ID!
    name: String
  }

  type Query {
    getPortfolios(
      perPage: Int = 6
      page: Int = 1
      direction: String = ""
      order: String = ""
      filter: filterType = {}
    ): [Portfolio]
    totalPortfolios(filter: filterType = {}): Int
    getTags(
      perPage: Int = 6
      page: Int = 1
      direction: String = ""
      order: String = ""
      filter: filterType = {}
    ): [Tag]
    totalTags(filter: filterType = {}): Int
    login(email: String, password: String): User
  }

  type Mutation {
    createTag(name: String): ID!
    deleteTag(id: ID!): ActionResponce
    editTag(id: ID!, name: String): ActionResponce
    createPortfolio(
      img: String
      name: String
      url: String
      tags: [tagInput]
      order_number: String
      uploadedFile: String
    ): ActionResponce
    editPortfolio(
      id: ID!
      img: String
      name: String
      url: String
      tags: [tagInput]
      order_number: Int
      uploadedFile: String
    ): ActionResponce
    deletePortfolio(id: ID!): ActionResponce
    uploadFile(file: FileUpload!): File!
  }
`
