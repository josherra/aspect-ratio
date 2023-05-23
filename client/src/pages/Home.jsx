import { Link } from "react-router-dom";
import { Header } from "../components/Home/Header";
import { Hero } from "../components/Home/Hero";
import { SearchHome } from "../components/Home/SearchHome";

export const Home = () => {
  return (
    <>
      <Header />
      <SearchHome />
      <Hero />
    </>
  );
};
