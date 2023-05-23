import { SearchItem } from "./SearchItem";
import "../../assets/search.css";

export const SearchResults = ({ results }) => {
  return (
    <>
      <div className="search-results">
        {results.length > 0
          ? results.map((game) => <SearchItem key={game.id} game={game} />)
          : null}
      </div>
    </>
  );
};
