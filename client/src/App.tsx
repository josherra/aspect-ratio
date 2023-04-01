import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {
  Avatar,
  Box,
  Card,
  Fade,
  ImageList,
  ImageListItem,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import { SetStateAction, useState, useEffect } from "react";
import { Navigation } from "./components/Navigation";
import axios from "axios";
import { IGame } from "./types/Game";
import { Search } from "./components/Search";

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
        <Search
          games={games}
          handleQuery={handleQuery}
          query={query}
          addItemToList={addItemToList}
          isSearching={isSearching}
        />
        <Typography variant="h3">My list of games:</Typography>
        {myList.length > 0 ? (
          <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
            {myList.map((game) => (
              <ImageListItem key={game.id}>
                <img
                  style={{ cursor: "pointer" }}
                  onClick={() => removeItemFromList(game)}
                  src={`${game.cover.url}`}
                  alt={game.name}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        ) : (
          <p>Add some games above!</p>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default App;
