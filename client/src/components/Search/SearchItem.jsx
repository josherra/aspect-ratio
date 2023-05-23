export const SearchItem = ({ game }) => {
  return (
    <div className="search-item">
      <img src={game.cover.url} alt="" />
      <p>{game.name}</p>
    </div>
  );
};
