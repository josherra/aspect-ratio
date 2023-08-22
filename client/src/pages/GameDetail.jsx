import axios from "../api/axios";
import { useEffect, useState } from "react";
import { useAuthStore } from "../store/store";
import { useParams } from "react-router-dom";

export const GameDetail = () => {
  const [game, setGame] = useState();
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    axios.get(`/api/games/${id}`).then((res) => {
      setGame(res.data);
    });
  }, []);

  return <>{game ? <h1>{game.name}</h1> : <h1>Loading...</h1>}</>;
};
