import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Container } from "@mui/material";

export const Layout = () => {
  return (
    <main>
      <Container>
        <Navigation />
        <Outlet />
      </Container>
    </main>
  );
};
