import axios from "../../api/axios";
import { useEffect, useState } from "react";
import { useAuthStore } from "../../store/store";
import { useParams } from "react-router-dom";

export const GameDetail = () => {
  const [game, setGame] = useState();
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    axios.get(`/api/games/${id}`).then((res) => setGame(res.data));
  }, []);

  return (
    <>
      {game ? (
        <div>
          <h1>{game.name}</h1>
          <img
            style={{ width: "500px", height: "auto" }}
            src={`https://images.igdb.com/igdb/image/upload/t_1080p/${game.screenshots[0].image_id}.jpg`}
            alt={`A screenshot from ${game.name}.`}
          />
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
};
