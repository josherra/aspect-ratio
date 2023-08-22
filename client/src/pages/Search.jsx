import { useEffect, useState } from "react";
import { SearchInput } from "../components/Search/SearchInput";
import { SearchResults } from "../components/Search/SearchResults";
import { useSearchParams } from "react-router-dom";
import axios from "../api/axios";

export const Search = () => {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [params, setParams] = useSearchParams();

  useEffect(() => {
    setResults([]);

    if (params.get("q")) {
      setSearch(params.get("q"));
      setQuery(params.get("q"));
    }

    searchForGame();
  }, [search]);

  const searchForGame = async () => {
    setResults([]);

    if (search) {
      const res = await axios.get(`/api/search/games?game=${search}`);
      setResults(res.data.results);
    }
  };

  return (
    <div className="p-4 flex flex-col mx-auto w-2/3 max-w-screen-xl">
      <SearchInput
        search={search}
        setSearch={setSearch}
        searchForGame={searchForGame}
        setParams={setParams}
        query={query}
        setQuery={setQuery}
        params={params}
      />
      <SearchResults results={results} />
    </div>
  );
};
