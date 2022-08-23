import { useState } from "react";
import { useMutation } from "@apollo/client";
import { EDIT_AUTHOR_BIRTH } from "../queries/EDIT_AUTHOR_BIRTH";

const Authors = ({ show, token, authors, setError }) => {
  const [selected, setSelected] = useState("");
  const [year, setYear] = useState("");
  const [editAuthorBirth] = useMutation(EDIT_AUTHOR_BIRTH, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
    },
  });

  const submit = async (event) => {
    event.preventDefault();
    editAuthorBirth({
      variables: {
        name: selected,
        year: parseInt(year),
      },
    });

    setYear("");
    setSelected("");
  };

  if (!show) {
    return null;
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {token && (
        <>
          <h2>set birthyear</h2>
          <form onSubmit={submit}>
            <select
              value={selected}
              onChange={({ target }) => setSelected(target.value)}
            >
              {authors.map((a) => (
                <option value={a.name} key={a.id}>
                  {a.name}
                </option>
              ))}
            </select>
            <div>
              born
              <input
                type="number"
                value={year}
                onChange={({ target }) => setYear(target.value)}
              />
            </div>
            <button type="submit">update author</button>
          </form>
        </>
      )}
    </div>
  );
};

export default Authors;
