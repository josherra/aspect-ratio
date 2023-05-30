import { SearchItem } from "./SearchItem";
import Row from "react-bootstrap/Row";

export const SearchResults = ({ results }) => {
  return (
    <>
      <Row className="p-4 m-4">
        {results.length > 0
          ? results.map((game) => <SearchItem key={game.id} game={game} />)
          : null}
      </Row>
    </>
  );
};
