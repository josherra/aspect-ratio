import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

export const SearchInput = ({
  query,
  setSearch,
  setParams,
  setQuery,
  params,
}) => {
  return (
    <>
      <InputGroup
        size="lg"
        style={{ margin: "2rem auto" }}
        className="mw-50 w-75"
      >
        <Form.Control
          aria-label="Large"
          aria-describedby="inputGroup-sizing-lg"
          placeholder="Enter a game..."
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setParams({ q: query });
              setSearch(query);
            }
          }}
          value={query}
        />
      </InputGroup>
    </>
  );
};
