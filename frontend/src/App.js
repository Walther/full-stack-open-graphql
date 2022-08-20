import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { gql, useQuery } from "@apollo/client";

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      id
      name
      born
      bookCount
    }
  }
`;

const ALL_BOOKS = gql`
  query {
    allBooks {
      id
      title
      author
      published
    }
  }
`;

const App = () => {
  const [page, setPage] = useState("authors");
  const allAuthors = useQuery(ALL_AUTHORS);
  const allBooks = useQuery(ALL_BOOKS);

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
      </div>

      <Authors
        show={page === "authors"}
        authors={allAuthors.loading ? [] : allAuthors.data.allAuthors}
      />

      <Books
        show={page === "books"}
        books={allBooks.loading ? [] : allBooks.data.allBooks}
      />

      <NewBook show={page === "add"} />
    </div>
  );
};

export default App;
