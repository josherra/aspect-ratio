import axios from "../api/axios";
import { useState } from "react";
import { useAuthStore } from "../store/store";
import { useNavigate, useLocation, Link } from "react-router-dom";
import image from "../assets/images/dungeon_preview.gif";

export const Register = () => {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [details, setDetails] = useState({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(false);

  const handleInput = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const submitRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/auth/register", details);

      login(res.data);
      setDetails({ name: "", username: "", password: "", confirmPassword: "" });
      navigate(from, { replace: true });
    } catch (err) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  return (
    <div>
      <img src={image} alt="" />
      <div>
        <h1>Register</h1>
        {error && (
          <p className="error-message">
            There was an issue registering. Please retry.
          </p>
        )}
        <form>
          <label htmlFor="name">Name</label>
          <input
            onChange={handleInput}
            type="text"
            name="name"
            id="name"
            placeholder="Name...."
            value={details.name}
          />
          <label htmlFor="username">Username</label>
          <input
            onChange={handleInput}
            type="text"
            name="username"
            id="username"
            placeholder="Username...."
            value={details.username}
          />
          <label htmlFor="password">Password</label>
          <input
            onChange={handleInput}
            type="password"
            name="password"
            id="password"
            placeholder="Password...."
            value={details.password}
          />
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            onChange={handleInput}
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Confirm password...."
            value={details.confirmPassword}
          />
          <button type="submit" onClick={submitRegister}>
            Register
          </button>
          <Link to="/login">Already have an account? Go to login page.</Link>
        </form>
      </div>
    </div>
  );
};
