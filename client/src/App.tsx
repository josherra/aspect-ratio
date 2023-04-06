import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Routes, Route } from "react-router-dom";
import { Container } from "@mui/system";
import { SetStateAction, useState, useEffect } from "react";
import axios from "axios";
import { IGame } from "./types/Game";
import { Navigation } from "./components/Navigation";
import { Search } from "./components/Search";
import { Login } from "./components/Login";

function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const App = () => {
  const [myList, setMyList] = useState<[IGame]>([]);
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

  const addItemToList = (game: any) => {
    setMyList(myList.concat(game));
    setQuery("");
    setGames([]);
  };

  const removeItemFromList = (game: any) => {
    const filtered = myList.filter((g) => g.id !== game.id);
    console.log(filtered);
    setMyList(filtered);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container style={{ border: "2px solid red", padding: "1rem" }}>
        <Navigation />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <Search
                games={games}
                handleQuery={handleQuery}
                query={query}
                addItemToList={addItemToList}
                isSearching={isSearching}
              />
            }
          ></Route>
        </Routes>
      </Container>
    </ThemeProvider>
  );
};

export default App;
