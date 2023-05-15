import { Link } from "react-router-dom";

export const Navigation = () => {
  return (
    <nav className="navigation">
      <Link to="/">
        <h1>Logo</h1>
      </Link>
      <div className="nav-items">
        <img
          src="https://img.freepik.com/premium-vector/man-avatar-icon-website-document-poster-design-printing-application-avatar-people-concept-icon-style_52494-1131.jpg?w=2000"
          alt="Some picture goes here"
        />
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
};
