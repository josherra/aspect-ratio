import { Header } from "../components/Home/Header";
import { Hero } from "../components/Home/Hero";
import { SearchHome } from "../components/Home/SearchHome";
import { useAuthStore } from "../store/store";
import { UserLibrary } from "../components/Home/UserLibrary";

export const Home = () => {
  const user = useAuthStore((state) => state.user);
  return (
    <>
      <Header user={user} />
      <SearchHome />
      {user ? <UserLibrary /> : <Hero />}
    </>
  );
};
