import axios from "axios";
import { useState } from "react";
import { useAuthStore } from "../store/store";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const login = useAuthStore((state) => state.login);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const navigate = useNavigate();

  const [details, setDetails] = useState({
    username: "",
    password: "",
  });

  const handleInput = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const submitLogin = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:8000/api/auth/login", {
      username: details.username,
      password: details.password,
    });
    login(res.data.token);
    navigate("/");
  };

  return (
    <div>
      <h1>Login</h1>
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
