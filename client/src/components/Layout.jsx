import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";

export const Layout = () => {
  return (
    <div className="container">
      <Navigation />
      <Outlet />
    </div>
  );
};
