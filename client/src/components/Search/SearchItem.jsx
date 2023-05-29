import { useAuthStore, useLibraryStore } from "../../store/store";
import { Link } from "react-router-dom";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";

export const SearchItem = ({ game }) => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const addToLibrary = useLibraryStore((state) => state.addToLibrary);
  const library = useLibraryStore((state) => state.library);
  const axiosPrivate = useAxiosPrivate();
  const [inUserLibrary, setInUserLibrary] = useState(false);

  const addGameToLibrary = async () => {
    setInUserLibrary(true);
    await axiosPrivate.post("/api/library/add", { game });
    addToLibrary(game);
  };

  useEffect(() => {
    if (isLoggedIn) {
      const found = library.find((g) => g.id === game.id);
      if (found) {
        setInUserLibrary(true);
      }
    }
  }, []);

  return (
    <div>
      <Link to={`/game/${game.id}`}>
        <img src={game.cover.url} alt="" />
      </Link>
      <div>
        <p>{game.name}</p>
        {isLoggedIn ? (
          <button disabled={inUserLibrary} onClick={addGameToLibrary}>
            {inUserLibrary ? "Already added" : "Add to library"}
          </button>
        ) : (
          <Link to="/login">Login to add</Link>
        )}
      </div>
    </div>
  );
};
