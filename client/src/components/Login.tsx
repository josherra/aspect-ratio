import axios from "axios";
import { useState } from "react";
import { useAuthStore } from "../store/store";
import { useNavigate, Link, useLocation } from "react-router-dom";

export const Login = () => {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [details, setDetails] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(false);

  const handleInput = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const submitLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8000/api/auth/login", {
        username: details.username,
        password: details.password,
      });

      login(res.data);
      setDetails({ username: "", password: "" });
      navigate(from, { replace: true });
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      {error ? "There was an issue logging in." : null}
      <form>
        <input
          onChange={handleInput}
          type="text"
          name="username"
          placeholder="Username...."
          value={details.username}
        />
        <input
          onChange={handleInput}
          type="password"
          name="password"
          id=""
          placeholder="Password...."
          value={details.password}
        />
        <button type="submit" onClick={submitLogin}>
          Login
        </button>
      </form>
    </div>
  );
};
