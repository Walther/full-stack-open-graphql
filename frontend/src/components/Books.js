import { useState } from "react";

const Books = ({ show, books }) => {
  const [genre, setGenre] = useState("all_genres");
  const genres = [...new Set(books.flatMap((book) => book.genres))];
  const filteredBooks =
    genre === "all_genres"
      ? books
      : books.filter((book) => book.genres.includes(genre));

  if (!show) {
    return null;
  }

  return (
    <div>
      <h2>books</h2>
      <select selected={genre} onChange={(e) => setGenre(e.target.value)}>
        <option key={"all_genres"} value={"all_genres"}>
          all genres
        </option>
        {genres.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
