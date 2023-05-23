import { Link } from "react-router-dom";
import { Header } from "../components/Home/Header";
import { Hero } from "../components/Home/Hero";
import { SearchHome } from "../components/Home/SearchHome";
import { useAuthStore } from "../store/store";
import { UserCatalogue } from "../components/Home/UserCatalog";

export const Home = () => {
  const user = useAuthStore((state) => state.user);
  return (
    <>
      <Header user={user} />
      <SearchHome />
      {user ? <UserCatalogue /> : <Hero />}
    </>
  );
};
