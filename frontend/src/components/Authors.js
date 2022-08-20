import { useState } from "react";
import { gql, useMutation } from "@apollo/client";

const EDIT_AUTHOR_BIRTH = gql`
  mutation editAuthorBirth($name: String!, $year: Int!) {
    editAuthor(name: $name, setBornTo: $year) {
      id
      name
      born
    }
  }
`;

const Authors = (props) => {
  const [selected, setSelected] = useState("");
  const [year, setYear] = useState("");
  const [editAuthorBirth] = useMutation(EDIT_AUTHOR_BIRTH);

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

  if (!props.show) {
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
          {props.authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>set birthyear</h2>
      <form onSubmit={submit}>
        <select
          value={selected}
          onChange={({ target }) => setSelected(target.value)}
        >
          {props.authors.map((a) => (
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
    </div>
  );
};

export default Authors;
