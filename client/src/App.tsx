import axios from "axios";
import { Routes, Route } from "react-router-dom";
import { SetStateAction, useState, useEffect } from "react";
import { IGame } from "./types/Game";
import { useDebounce } from "./hooks/useDebounce";
import { Login } from "./components/Login";
import { Home } from "./components/Home";
import { Admin } from "./components/Admin";
import { Missing } from "./components/Missing";
import { Layout } from "./components/Layout";
import { RequireAuth } from "./components/RequireAuth";

const App = () => {
  const [games, setGames] = useState<[IGame]>([]);
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchTerm = useDebounce(query, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsSearching(true);
      axios
        .get("http://localhost:8000/api/search/games", {
          params: { game: query, limit: 5 },
        })
        .then((res) => {
          setIsSearching(false);
          setGames(res.data.results);
        });
    } else {
      setGames([]);
      setIsSearching(false);
    }
  }, [debouncedSearchTerm]);

  const handleQuery = (e: { target: { value: SetStateAction<string> } }) => {
    setQuery(e.target.value);
  };

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />

        {/* we want to protect these routes */}
        <Route element={<RequireAuth />}>
          <Route path="/admin" element={<Admin />} />
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
};

export default App;
