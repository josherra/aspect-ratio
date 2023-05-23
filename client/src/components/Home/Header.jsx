import { useAuthStore } from "../../store/store";
import "../../assets/header.css";

export const Header = () => {
  const user = useAuthStore((state) => state.user);
  return (
    <header className="header">
      {user ? (
        <h1>Welcome, {user.username}</h1>
      ) : (
        <h1>Catalog your video games - share with your friends.</h1>
      )}
    </header>
  );
};
