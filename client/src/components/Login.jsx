import axios from "../api/axios";
import { useState } from "react";
import { useAuthStore } from "../store/store";
import { useNavigate, useLocation, Link } from "react-router-dom";
import image from "../assets/images/dungeon_preview.gif";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";

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
      <div className="login-container">
        <Image src={image} fluid roundedCircle />
        <Form className="container-info">
          <h1>Login</h1>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              onChange={handleInput}
              name="username"
              value={details.username}
              type="text"
              placeholder="Username"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={handleInput}
              name="password"
              value={details.password}
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <Button onClick={submitLogin} type="submit">
            Submit
          </Button>
        </Form>
      </div>
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
