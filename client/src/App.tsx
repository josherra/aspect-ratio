import { useState } from "react";
import { Navigation } from "./components/Navigation";

function App() {
  const [games, setGames] = useState([]);
  
  return (
    <div className="h-full border-red-400 border">
      <Navigation />
      <div>
        <input className="rounded p-3 bg-slate-300 hover:bg-white focus:bg-white text-black" type="text" placeholder="Enter a game name..." />
      </div>
    </div>
  );
}

export default App;
