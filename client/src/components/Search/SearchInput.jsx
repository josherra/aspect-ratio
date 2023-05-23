import { useEffect } from "react";

export const SearchInput = ({
  query,
  setSearch,
  setParams,
  setQuery,
  params,
}) => {
  return (
    <>
      <input
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setParams({ q: query });
            setSearch(query);
          }
        }}
        value={query}
        type="text"
        placeholder="Enter a game..."
        className="search"
      />
    </>
  );
};
