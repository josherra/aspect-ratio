import { useAuthStore, useLibraryStore } from "../../store/store";
import { Link, useNavigate } from "react-router-dom";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";

export const SearchItem = ({ game }) => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const addToLibrary = useLibraryStore((state) => state.addToLibrary);
  const library = useLibraryStore((state) => state.library);
  const axiosPrivate = useAxiosPrivate();
  const [inUserLibrary, setInUserLibrary] = useState(false);
  const navigation = useNavigate();

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
    <div className="border-gray-200/30 border-b-2 p-4 flex items-center">
      <img
        onClick={() => navigation(`/game/${game.id}`)}
        className="h-32 w-24 hover:cursor-pointer"
        src={game.cover.url}
        alt={`Cover art for ${game.name}`}
      />
      <div className="ml-8">
        <h2 className="text-2xl text-bold text-white">
          {game.name}{" "}
          <span className="text-xs font-thin">
            {game.release_dates ? game.release_dates[0].y : null}
          </span>
        </h2>
      </div>
    </div>
  );
};
