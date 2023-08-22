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
    <div className="h-auto flex flex-col justify-center mx-auto p-4 gap-8 max-w-screen-xl text-sm relative">
      {error && (
        <p className="mx-auto bg-red-500 absolute bottom-0 left-1/2 -translate-x-1/2 p-4">
          There was an issue registering. Please retry.
        </p>
      )}
      <form className="flex flex-col gap-4 w-full max-w-sm mx-auto">
        <label className="block text-sm font-semibold leading-6" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          onChange={handleInput}
          type="text"
          name="name"
          placeholder="Name...."
          value={details.name}
          className="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200"
        />
        <label
          className="block text-sm font-semibold leading-6"
          htmlFor="username"
        >
          Username
        </label>
        <input
          id="username"
          onChange={handleInput}
          type="text"
          name="username"
          placeholder="Username...."
          value={details.username}
          className="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200"
        />
        <label
          className="block text-sm font-semibold leading-6"
          htmlFor="password"
        >
          Password
        </label>
        <input
          onChange={handleInput}
          type="password"
          name="password"
          id="password"
          placeholder="Password...."
          value={details.password}
          className="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200"
        />
        <button
          type="submit"
          onClick={submitRegister}
          className="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-accentOrange text-white hover:bg-slate-700 w-full"
        >
          Register
        </button>
        <Link
          className="mx-auto font-thin hover:text-accentBlue transition"
          to="/login"
        >
          Already have an account? Click here to login
        </Link>
      </form>
    </div>
  );
};
