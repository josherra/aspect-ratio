import { Routes, Route } from "react-router-dom";
import { RequireAuth } from "./components/RequireAuth";
import { Layout } from "./components/Layout";
import { Login } from "./components/Login";
import { Home } from "./components/Home";
import { Admin } from "./components/Admin";
import { Missing } from "./components/Missing";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />

        {/* we want to protect these routes */}
        <Route element={<RequireAuth />}>
          <Route path="/admin" element={<Admin />} />
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
