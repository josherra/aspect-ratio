import { Link } from "react-router-dom";
import { useAuthStore } from "../store/store";

export const Navigation = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <nav className="navigation">
      <Link to="/">
        <h1>Aspect Ratio</h1>
      </Link>
      <div className="nav-items">
        {user && (
          <img
            src="https://img.freepik.com/premium-vector/man-avatar-icon-website-document-poster-design-printing-application-avatar-people-concept-icon-style_52494-1131.jpg?w=2000"
            alt="Some picture goes here"
          />
        )}
        {user ? <a onClick={logout}>Logout</a> : <Link to="/login">Login</Link>}
      </div>
    </nav>
  );
};
