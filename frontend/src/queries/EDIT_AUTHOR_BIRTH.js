import { gql } from "@apollo/client";

export const EDIT_AUTHOR_BIRTH = gql`
  mutation editAuthorBirth($name: String!, $year: Int!) {
    editAuthor(name: $name, setBornTo: $year) {
      id
      name
      born
    }
  }
`;
