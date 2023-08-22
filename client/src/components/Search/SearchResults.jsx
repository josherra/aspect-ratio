import { SearchItem } from "./SearchItem";

export const SearchResults = ({ results }) => {
  return (
    <div className="">
      {results.length > 0
        ? results.map((game) => <SearchItem key={game.id} game={game} />)
        : null}
    </div>
  );
};
