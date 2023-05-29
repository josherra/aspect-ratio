import axios from "../api/axios";
import { useState } from "react";
import { useAuthStore } from "../store/store";
import { useNavigate, useLocation, Link } from "react-router-dom";
import image from "../assets/images/dungeon_preview.gif";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

export const Login = () => {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [details, setDetails] = useState({
    username: "Joshua",
    password: "123456",
  });
  const [error, setError] = useState(false);

  const handleInput = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const submitLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/auth/login", {
        username: details.username,
        password: details.password,
      });

      login(res.data);
      setDetails({ username: "", password: "" });
      navigate(from, { replace: true });
    } catch (err) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  return (
    <>
      <Form.Label htmlFor="username">Username</Form.Label>
      <InputGroup>
        <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
        <Form.Control
          placeholder="Username"
          aria-label="Username"
          id="username"
          aria-describedby="basic-addon1"
        />
      </InputGroup>
      <Form.Label htmlFor="inputPassword">Password</Form.Label>
      <Form.Control
        type="password"
        id="inputPassword"
        aria-describedby="passwordHelpBlock"
      />
      <Form.Text id="passwordHelpBlock" muted>
        Your password must be 8-20 characters long, contain letters and numbers,
        and must not contain spaces, special characters, or emoji.
      </Form.Text>
      <Button>Submit</Button>
    </>
    // <div className="login-container">
    //   <img src={image} alt="" />
    //   <div className="login-info">
    //     <h1>Login</h1>
    //     {error && (
    //       <p className="error-message">
    //         There was an issue loggin in. Please retry.
    //       </p>
    //     )}
    //     <form>
    //       <input
    //         onChange={handleInput}
    //         type="text"
    //         name="username"
    //         placeholder="Username...."
    //         value={details.username}
    //       />
    //       <input
    //         onChange={handleInput}
    //         type="password"
    //         name="password"
    //         id=""
    //         placeholder="Password...."
    //         value={details.password}
    //       />
    //       <button type="submit" onClick={submitLogin}>
    //         Login
    //       </button>
    //       <Link to="/register">New here? Register for an account</Link>
    //     </form>
    //   </div>
    // </div>
  );
};
