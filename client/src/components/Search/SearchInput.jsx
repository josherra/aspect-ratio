export const SearchInput = ({ query, setSearch, setParams, setQuery }) => {
  return (
    <>
      <input
        className="w-1/4 mb-4 rounded py-2 px-4"
        placeholder="Enter a game..."
        type="text"
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setParams({ q: query });
            setSearch(query);
          }
        }}
        value={query}
      />
    </>
  );
};
