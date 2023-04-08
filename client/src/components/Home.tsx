import { useAuthStore } from "../store/store";
import { useAxiosPrivate } from "../hooks/useAxiosPrivate";

export const Home = () => {
  const user = useAuthStore((state) => state.user);
  const axiosPrivate = useAxiosPrivate();

  const sendRequest = async () => {
    console.log(await axiosPrivate.get("/api/catalogue"));
  };

  return (
    <div>
      <h1>Hello you are home.</h1>
      {user ? `user is found: ${user.name}` : "user is not found"}
      {user ? <button onClick={sendRequest}>Send Request</button> : null}
    </div>
  );
};
