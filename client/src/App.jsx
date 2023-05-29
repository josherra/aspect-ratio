import { Routes, Route } from "react-router-dom";
import { RequireAuth } from "./components/RequireAuth";
import { Layout } from "./components/Layout";
import { Login } from "./components/Login";
import { Home } from "./pages/Home";
import { Admin } from "./components/Admin";
import { Missing } from "./components/Missing";
import { GameDetail } from "./components/Game/GameDetail";
import { Search } from "./pages/Search";
import { Register } from "./components/Register";
import Container from "react-bootstrap/esm/Container";

function App() {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/game/:id" element={<GameDetail />} />

          {/* we want to protect these routes */}
          <Route element={<RequireAuth />}>
            <Route path="/admin" element={<Admin />} />
          </Route>

          {/* catch all */}
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </Container>
  );
}

export default App;
