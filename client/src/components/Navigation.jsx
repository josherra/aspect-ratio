import { Link } from "react-router-dom";
import { useAuthStore } from "../store/store";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Navigation = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const [query, setQuery] = useState("");
  const navigation = useNavigate();

  const handleSearchRedirect = (e) => {
    if (e.key === "Enter") {
      const encodedURL = encodeURIComponent(query).replaceAll("%20", "+");
      setQuery("");
      navigation(`/search?q=${encodedURL}`);
    }
  };

  return (
    <>
      <nav className="text-xs max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/">
          <h2 className="text-3xl font-bold">ASPECT RATIO</h2>
        </Link>
        <div className="p-2">
          <input
            value={query}
            type="text"
            placeholder="Search..."
            className="mr-8 px-4 py-2 rounded-3xl"
            onKeyDown={handleSearchRedirect}
            onChange={(e) => setQuery(e.target.value)}
          />
          {user ? (
            <Link
              className="border-accentBlue hover:bg-accentBlue transition rounded border-2 px-6 py-2"
              onClick={logout}
            >
              LOGOUT
            </Link>
          ) : (
            <>
              <Link
                className="border-accentOrange hover:bg-accentOrange transition rounded border-2 px-6 py-2 mr-8"
                to="/search"
              >
                GAMES
              </Link>
              <Link
                className="border-accentBlue hover:bg-accentBlue transition rounded border-2 px-6 py-2"
                to="/login"
              >
                LOGIN
              </Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
};
