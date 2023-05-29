import { useEffect } from "react";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";
import { useLibraryStore } from "../../store/store";
import { Link } from "react-router-dom";

export const UserLibrary = () => {
  const axiosPrivate = useAxiosPrivate();
  const setUserLibrary = useLibraryStore((state) => state.setUserLibrary);
  const library = useLibraryStore((state) => state.library);

  const fetchUserLibrary = async () => {
    try {
      const res = await axiosPrivate.get("/api/library/userLibrary");
      setUserLibrary(res.data.games);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserLibrary();
  }, []);

  return (
    <>
      <h1>Users games go here</h1>
      <p>{library.length}</p>
      {library.length > 0 &&
        library.map((game) => (
          <Link to={`/game/${game.id}`}>
            <img
              style={{ width: "200px", height: "auto" }}
              src={`${game.cover.url}`}
              key={game.id}
            />
          </Link>
        ))}

      <h1>Recommended games</h1>
    </>
  );
};
