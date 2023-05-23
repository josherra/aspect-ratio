import "../../assets/header.css";

export const Header = ({ user }) => {
  return (
    <header className="header">
      {user ? (
        <h1>Welcome, {user.username}</h1>
      ) : (
        <h1>Catalog your video games - share with your friends.</h1>
      )}
    </header>
  );
};
