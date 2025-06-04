export function BookPreview({ book, index }) {
  return (
    <article className="car-preview">
      <h2>Title: {book.title}</h2>
      <h4>Description: {book.description}</h4>
      <img src={`../assets/img/${index}.jpg`} alt="car-image" />
    </article>
  );
}
