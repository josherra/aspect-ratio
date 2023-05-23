import { useEffect } from "react";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";
import { useCatalogueStore } from "../../store/store";

export const UserCatalogue = () => {
  const axiosPrivate = useAxiosPrivate();
  const setUserCatalogue = useCatalogueStore((state) => state.setUserCatalogue);
  const catalogue = useCatalogueStore((state) => state.catalogue);

  const getUserCatalogue = async () => {
    try {
      const res = await axiosPrivate.get("/api/catalogue/userCatalogue");
      setUserCatalogue(res.data.games);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserCatalogue();
  }, []);

  return (
    <>
      <h1>Users games go here</h1>
      {catalogue.length > 0 &&
        catalogue.map((game) => <p key={game.id}>{game.name}</p>)}

      <h1>Recommended games</h1>
    </>
  );
};
