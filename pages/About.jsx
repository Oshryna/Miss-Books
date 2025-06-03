const { Outlet, Link } = ReactRouterDOM;

export function About() {
  return (
    <section className="about">
      <h1>Miss Books Experimental Lab</h1>
      <p>
        Welcome to our experimental playground! This is where we test new
        features, explore innovative ideas, and experiment with different
        approaches to enhance your book management experience. Feel free to
        explore and discover what's coming next to Miss Books.
      </p>
      <div className="experiment-info">
        <h3>🧪 Current Experiments</h3>
        <ul>
          <li>Advanced book filtering and search algorithms</li>
          <li>AI-powered book recommendations</li>
          <li>Interactive reading progress tracking</li>
          <li>Social features for book sharing</li>
        </ul>
      </div>
      <nav>
        <Link to="/about/team">Team</Link>
        <Link to="/about/vision">Vision</Link>
      </nav>
      <section>
        <Outlet />
      </section>
    </section>
  );
}
