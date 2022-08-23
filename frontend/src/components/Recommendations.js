const Recommendations = ({ show, books, genre }) => {
  const filteredBooks = books.filter((book) => book.genres.includes(genre));

  if (!show) {
    return null;
  }

  return (
    <div>
      <h2>recommendations</h2>
      books in your favorite genre: {genre}
      <table>
        <tbody>
          <tr>
            <th>title</th>
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

export default Recommendations;
