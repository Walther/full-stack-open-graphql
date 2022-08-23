import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";
import { useQuery, useApolloClient } from "@apollo/client";
import { ALL_AUTHORS } from "./queries/ALL_AUTHORS";
import { ALL_BOOKS } from "./queries/ALL_BOOKS";

const App = () => {
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [page, setPage] = useState("authors");
  const allAuthors = useQuery(ALL_AUTHORS);
  const allBooks = useQuery(ALL_BOOKS);
  const client = useApolloClient();

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  const Notify = ({ errorMessage }) => {
    if (!errorMessage) {
      return null;
    }
    return <div style={{ color: "red" }}> {errorMessage} </div>;
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
      </div>

      <Notify errorMessage={errorMessage} />

      <Authors
        show={page === "authors"}
        authors={allAuthors.loading ? [] : allAuthors.data.allAuthors}
        token={token}
        setError={notify}
      />

      <Books
        show={page === "books"}
        books={allBooks.loading ? [] : allBooks.data.allBooks}
      />

      <NewBook show={page === "add"} setError={notify} />

      <Login show={page === "login"} setToken={setToken} setError={notify} />
    </div>
  );
};

export default App;
