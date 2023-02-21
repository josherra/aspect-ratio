import { useState } from "react";
import { Navigation } from "./components/Navigation";

const App = () => {
  const [games, setGames] = useState([]);

  const listenForGame = (e) => {
    console.log(e.target.value);
  };

  return (
    <div className="h-full border-red-400 border">
      <Navigation />
      <div className="mx-auto border">
        <input
          className="rounded p-3 bg-slate-300 hover:bg-white focus:bg-white text-black w-1/2"
          type="text"
          onChange={listenForGame}
          placeholder="Enter a game name..."
        />
      </div>
    </div>
  );
};

export default App;
