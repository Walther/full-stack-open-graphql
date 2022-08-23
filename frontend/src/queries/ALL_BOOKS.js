import { gql } from "@apollo/client";

export const ALL_BOOKS = gql`
  query {
    allBooks {
      id
      title
      author {
        id
        name
        born
        bookCount
      }
      published
    }
  }
`;
