import { useAuthStore, useCatalogueStore } from "../../store/store";
import { Link } from "react-router-dom";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";

export const SearchItem = ({ game }) => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const addToCatalogue = useCatalogueStore((state) => state.addToCatalogue);
  const catalogue = useCatalogueStore((state) => state.catalogue);
  const axiosPrivate = useAxiosPrivate();
  const [inUserCatalogue, setInUserCatalogue] = useState(false);

  const addGameToCatalogue = async () => {
    setInUserCatalogue(true);
    await axiosPrivate.post("/api/catalogue/add", { game });
    addToCatalogue(game);
  };

  useEffect(() => {
    if (isLoggedIn) {
      const found = catalogue.find((g) => g.id === game.id);
      if (found) {
        setInUserCatalogue(true);
      }
    }
  }, []);

  return (
    <div className="search-item">
      <Link to={`/game/${game.id}`}>
        <img src={game.cover.url} alt="" />
      </Link>
      <div>
        <p>{game.name}</p>
        {isLoggedIn ? (
          <button disabled={inUserCatalogue} onClick={addGameToCatalogue}>
            {inUserCatalogue ? "Already added" : "Add to catalogue"}
          </button>
        ) : (
          <Link to="/login">Login to add</Link>
        )}
      </div>
    </div>
  );
};
