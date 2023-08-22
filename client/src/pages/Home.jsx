import { useAuthStore } from "../store/store";
import { Dashboard } from "../components/Dashboard";
import { Link } from "react-router-dom";
import image from "../assets/images/main_page_background.png";

export const Home = () => {
  const user = useAuthStore((state) => state.user);

  if (user) {
    return (
      <>
        <Dashboard />
      </>
    );
  }

  return (
    <>
      <div className="text-center h-full">
        <p className="mt-48 font-bold text-4xl">
          Track the games you’ve played. <br />
          Keep tabs on the games you want to play.
        </p>
        <Link to="/register">
          <button className="mt-10 text-xl bg-accentBlue py-2 px-6 rounded">
            CREATE YOUR ACCOUNT, IT’S FREE!
          </button>
        </Link>
        <img
          src={image}
          alt=""
          className="mx-auto mt-10 object-cover rounded-xl"
        />
      </div>
    </>
  );
};
