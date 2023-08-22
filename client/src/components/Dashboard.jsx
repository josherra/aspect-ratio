import { useEffect } from "react";
import { useAuthStore, useLibraryStore } from "../store/store";
import { useAxiosPrivate } from "../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const axiosPrivate = useAxiosPrivate();
  const user = useAuthStore((state) => state.user);
  const setUserLibrary = useLibraryStore((state) => state.setUserLibrary);
  const library = useLibraryStore((state) => state.library);
  const recentActivity = library ? library.slice(0, 4) : null;
  const navigation = useNavigate();

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
    <div className="max-w-screen-xl mx-auto p-4 mt-10">
      <section className="bg-secondary p-8 flex items-center">
        <div className="circle w-24 h-24 bg-white rounded-full"></div>
        <div className="ml-8">
          <h1 className="font-bold">{user.username}</h1>
          <p className="text-xs">
            Member since {new Date(user.createdAt).toLocaleDateString("en-CA")}
          </p>
        </div>
        <div className="ml-auto flex">
          <p>
            {library.length} <span className="text-white/50">games</span>{" "}
            <span className="mx-2 text-3xl">/</span> 12{" "}
            <span className="text-white/50">wishlisted</span>
          </p>
        </div>
      </section>
      <div className="grid mt-8">
        <p className="ml-4 font-thin border-b-2 border-gray-100/20 text-xs">
          RECENT ACTIVITY
        </p>
        <section className="p-4 flex gap-5">
          {recentActivity.map((game) => (
            <img
              onClick={() => navigation(`/game/${game.id}`)}
              className="game-box hover:cursor-pointer"
              src={game.cover.url}
            />
          ))}
        </section>
      </div>
    </div>
  );
};
