import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SearchHome = () => {
  const [query, setQuery] = useState("");
  const navigation = useNavigate();

  const handleSearchRedirect = (e) => {
    if (e.key === "Enter") {
      const encodedURL = encodeURIComponent(query).replaceAll("%20", "+");
      navigation(`/search?q=${encodedURL}`);
    }
  };

  return (
    <>
      <input
        value={query}
        type="text"
        placeholder="Search for any game..."
        onKeyDown={handleSearchRedirect}
        onChange={(e) => setQuery(e.target.value)}
      />
    </>
  );
};
