import { useAuthStore, useLibraryStore } from "../../store/store";
import { Link } from "react-router-dom";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";

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
    <Col style={{ borderBottom: "2px solid beige" }} md={12}>
      <Card className="d-flex flex-row m-4" border="0">
        <Link to={`/game/${game.id}`}>
          <Image width={120} src={game.cover.url} />
        </Link>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <h4 style={{ marginLeft: "2rem" }}>{game.name}</h4>
          {isLoggedIn && (
            <div>
              <Button
                onClick={addGameToLibrary}
                size="sm"
                style={{ width: "125px", marginLeft: "2rem" }}
                variant="primary"
                disabled={inUserLibrary}
              >
                {inUserLibrary ? "In user library" : "Add to library"}
              </Button>
              <Button
                size="sm"
                style={{ width: "125px", marginLeft: "1rem" }}
                variant="secondary"
              >
                Add to wishlist
              </Button>
            </div>
          )}
          <ListGroup style={{ marginLeft: "2rem" }} horizontal>
            {game.platforms.map((platform) => (
              <ListGroup.Item style={{ fontSize: "10px" }}>
                {platform.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      </Card>
    </Col>
  );
};
